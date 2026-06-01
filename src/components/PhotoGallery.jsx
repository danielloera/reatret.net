import { useWindowSize } from "@uidotdev/usehooks";
import appwrite from '../lib/appwrite';
import Loader from './Loader';
import AppBar from './AppBar';
import { useState, useEffect, useMemo } from 'react';
import { InView } from "react-intersection-observer";

const COL_SIZE_SCALE = 4;

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export default function PhotoGallery() {
    const [photos, setPhotos] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const size = useWindowSize();

    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        setHasMounted(true);

        // Restore state from sessionStorage
        const savedState = sessionStorage.getItem('reatret-gallery-state');
        if (savedState) {
            try {
                const { photos: savedPhotos, pageIndex: savedPageIndex, hasMore: savedHasMore, scrollY: savedScrollY } = JSON.parse(savedState);
                if (savedPhotos && savedPhotos.length > 0) {
                    setPhotos(savedPhotos);
                    setPageIndex(savedPageIndex);
                    setHasMore(savedHasMore);
                    // Scroll restoration will happen in a separate useEffect once photos are rendered
                    if (savedScrollY) {
                        setTimeout(() => {
                            window.scrollTo(0, savedScrollY);
                        }, 100);
                    }
                }
            } catch (e) {
                console.error("Failed to restore gallery state", e);
            }
        }

        return () => {
            if (window.history.scrollRestoration) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    const saveState = () => {
        const state = {
            photos,
            pageIndex,
            hasMore,
            scrollY: window.scrollY
        };
        sessionStorage.setItem('reatret-gallery-state', JSON.stringify(state));
    };

    useEffect(() => {
        if (photos.length > 0) {
            saveState();
        }
    }, [photos, pageIndex, hasMore]);

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            setIsPageLoading(true);
            const result = await appwrite.getPhotoPage(pageIndex);
            if (!ignore) {
                if (result.documents && result.documents.length > 0) {
                    setPhotos(prevPhotos => {
                        const existingIds = new Set(prevPhotos.map(p => p.id));
                        const newPhotos = result.documents.filter(p => !existingIds.has(p.id));
                        return [...prevPhotos, ...newPhotos];
                    });
                } else {
                    setHasMore(false);
                }
                setIsPageLoading(false);
            }
        };

        // Only fetch if we don't already have photos for this page index (or if we are starting fresh)
        // This is a bit tricky because pageIndex increments. 
        // If we restored state, pageIndex might be 5, but we have all photos for pages 0-5.
        // So we only fetch if we are moving to a NEW pageIndex that hasn't been loaded.
        if (hasMore && photos.length <= pageIndex * 15) { // 15 is PAGE_SIZE from appwrite_helper
            fetchData();
        } else {
            setIsPageLoading(false);
        }

        return () => {
            ignore = true;
        };
    }, [pageIndex, hasMore]);

    const photoColumns = useMemo(() => {
        if (!hasMounted || photos.length === 0 || !size.width) return [];

        const numCols = Math.max(1, Math.round(size.width / (COL_SIZE_SCALE * 100)));
        const columns = Array.from({ length: numCols }, () => ({ photos: [], heightRatio: 0 }));

        photos.forEach((photo) => {
            let shortestColIndex = 0;
            for (let i = 1; i < columns.length; i++) {
                if (columns[i].heightRatio < columns[shortestColIndex].heightRatio) {
                    shortestColIndex = i;
                }
            }
            columns[shortestColIndex].photos.push(photo);
            columns[shortestColIndex].heightRatio += photo.height / photo.width;
        });

        return columns;
    }, [photos, size.width, hasMounted]);

    if (!hasMounted || (isPageLoading && pageIndex === 0 && photos.length === 0)) return <Loader />;

    return (
        <main className="relative pt-20">
            <AppBar buttons={
                <span
                    className="cursor-pointer pl-4"
                    onClick={() => {
                        const shuffled = shuffleArray(photos);
                        setPhotos(shuffled);
                        saveState();
                    }}>
                    🔀
                </span>} />
            <div className="w-full min-h-[200vh] p-3 m-auto">
                <div className="flex flex-row justify-center gap-3">
                    {photoColumns.map((col, cIdx) => {
                        const colWidth = Math.round(size.width / photoColumns.length);
                        return <div key={cIdx} className="flex flex-col gap-3 w-full">
                            {col.photos.map((photo, pIdx) => {
                                const adjustedPhotoHeight = Math.round((colWidth / photo.width) * photo.height);
                                return (
                                    <InView key={photo.id} triggerOnce={true} rootMargin="1000px">
                                        {({ inView, ref }) => (
                                            <div
                                                ref={ref}
                                                className="bg-stone-900 rounded-lg overflow-hidden relative group"
                                                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                                            >
                                                <a href={`/photo/${photo.id}`} onClick={saveState} className="block w-full">
                                                    <img
                                                        className={`w-full h-auto rounded-md object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.05] transform-gpu ${!inView ? "animate-pulse opacity-0" : "opacity-100"}`}
                                                        width={colWidth}
                                                        height={adjustedPhotoHeight}
                                                        src={inView ? photo.thumbnail_url : "/gray.svg"}
                                                        alt={photo.description}
                                                        loading={pIdx < 4 ? "eager" : "lazy"}
                                                    />
                                                    <div className="absolute inset-0 z-10 pointer-events-none rounded-md group-hover:ring-inset group-hover:ring-[3px] group-hover:ring-teal-500 transition-all duration-500" />
                                                </a>
                                            </div>
                                        )}
                                    </InView>
                                )
                            })}
                        </div>
                    })}
                </div>

                <InView
                    as="div"
                    threshold={0}
                    onChange={(inView) => {
                        if (inView && hasMore && !isPageLoading) {
                            setPageIndex((prev) => prev + 1);
                        }
                    }}>
                    <div className="flex justify-center min-h-[80px] my-8">
                        {isPageLoading && (
                            <span className="pt-mono-regular text-white">Loading...</span>
                        )}
                    </div>
                </InView>

                <div className="flex justify-center mt-4">
                    {!hasMore && (
                        <div
                            className="pt-mono-regular text-sm
                           sm:text-base text-center text-stone-400">
                            no more.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
