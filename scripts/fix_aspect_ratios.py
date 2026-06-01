import os
import argparse
import requests
from PIL import Image, ImageOps
from io import BytesIO
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.query import Query

# Configuration
ENDPOINT = 'https://reatret.net/v1'
PROJECT_ID = '6643f12100122b48edf9'
DATABASE_ID = 'photos'
COLLECTION_ID = 'metadata'

def get_actual_dimensions(url):
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        # Handle EXIF orientation
        img = ImageOps.exif_transpose(img)
        return img.size
    except Exception as e:
        print(f"Error fetching image: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Fix aspect ratio inconsistencies in Appwrite photos database.")
    parser.add_argument("--key", required=True, help="Appwrite API Key")
    parser.add_argument("--fix", action="store_true", help="Apply fixes instead of just auditing")
    parser.add_argument("--debug", action="store_true", help="Show all comparisons even if they match")
    args = parser.parse_args()

    api_key = args.key
    client = Client()
    client.set_endpoint(ENDPOINT)
    client.set_project(PROJECT_ID)
    client.set_key(api_key)

    databases = Databases(client)

    print(f"Fetching photos from {DATABASE_ID}/{COLLECTION_ID}...")
    
    try:
        # Use pagination to fetch all documents
        photos = []
        offset = 0
        limit = 100
        
        while True:
            result = databases.list_documents(
                DATABASE_ID, 
                COLLECTION_ID,
                queries=[Query.limit(limit), Query.offset(offset)]
            )
            batch = result.get('documents', [])
            photos.extend(batch)
            if len(batch) < limit:
                break
            offset += limit
            
        print(f"Retrieved {len(photos)} photos. Auditing...")
    except Exception as e:
        print(f"Failed to fetch documents: {e}")
        return

    to_fix = []

    for photo in photos:
        photo_id = photo['$id']
        stored_w = photo.get('width')
        stored_h = photo.get('height')
        url = photo.get('full_res_url')
        description = photo.get('description', 'No description')

        if not url:
            print(f"Skipping {photo_id}: No full_res_url")
            continue

        dimensions = get_actual_dimensions(url)
        if not dimensions:
            print(f"Skipping {photo_id}: Could not determine actual dimensions")
            continue

        actual_w, actual_h = dimensions

        is_mismatch = (int(actual_w) != int(stored_w)) or (int(actual_h) != int(stored_h))

        if args.debug or is_mismatch:
            status = "[MISMATCH]" if is_mismatch else "[OK]"
            print(f"{status} {description} ({photo_id})")
            print(f"  Stored: {stored_w}x{stored_h}")
            print(f"  Actual: {actual_w}x{actual_h}")

        if is_mismatch:
            to_fix.append({
                'id': photo_id,
                'width': actual_w,
                'height': actual_h,
                'description': description
            })

    if not to_fix:
        print("\nSuccess: No aspect ratio inconsistencies found.")
        return

    print(f"\nFound {len(to_fix)} items that need fixing.")

    if not args.fix:
        print("\nAudit complete. Run with --fix to apply changes.")
        return

    print("\nApplying fixes...")
    for item in to_fix:
        print(f"Updating [{item['description']}] ...", end=" ", flush=True)
        try:
            databases.update_document(
                DATABASE_ID,
                COLLECTION_ID,
                item['id'],
                data={
                    'width': item['width'],
                    'height': item['height']
                }
            )
            print("Done.")
        except Exception as e:
            print(f"Error: {e}")

    print("\nAll operations finished.")

if __name__ == "__main__":
    main()
