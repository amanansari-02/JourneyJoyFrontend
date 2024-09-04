import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { Breadcrumbs } from '@material-tailwind/react';

const ImagesVideos = () => {
    const location = useLocation();
    const propertyImages = location.state?.propertyImages;
    const propertyId = location.state?.id;

    const apiUrl = import.meta.env.VITE_API_URL
    const allImg = propertyImages.map((img) => apiUrl + '/' + img)

    const [images, setImages] = useState(allImg);
    const [isLoading, setIsLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        window['global'] = window;
    }, []);

    return (
        <>
            <Breadcrumbs className='m-4'>
                <Link to={"/property"} className="opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mr-1 -mt-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v-2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </Link>
                <Link to={`/property/${propertyId}`} className="opacity-60">
                    <span>Beach Front Villa</span>
                </Link>
                <div href="#" className="opacity-60">
                    <span>Images & Videos</span>
                </div>
            </Breadcrumbs>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className='m-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                        {Array.isArray(images) &&
                            images.map((item, index) => {
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={`${index === 0 ? 'md:row-span-2 md:col-span-2' : ''}`}
                                        onClick={() => {
                                            setPhotoIndex(index);
                                        }}
                                    >
                                        <img src={`${item}`} alt={item.alt} data-fancybox="gallery" className="rounded-md w-full h-full object-cover" />
                                    </button>
                                );
                            })}
                    </div>

                    {isOpen && (
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => setIsOpen(false)}
                            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                            animationDuration={300}
                            keyRepeatLimit={180}
                        />
                    )}
                </div>
            )}

            {/* Uncomment and use below code if you want to display videos */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                {Array.isArray(videoArray) && videoArray.map((video, i) => (
                    <div key={i} style={{ margin: 10, width: 300, height: 170 }}>
                        <ReactPlayer width="100%" height="100%" playing={true} controls={true} loop={true} muted={true} playsinline={true} url={`${video}`} />
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default ImagesVideos;
