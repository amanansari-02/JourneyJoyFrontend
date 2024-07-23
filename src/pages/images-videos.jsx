import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { Breadcrumbs } from '@material-tailwind/react';
// import { useDispatch } from 'react-redux';
// import Loader from '../../../components/Loader';
// import { setPageTitle } from '../../../store/themeConfigSlice';
// import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../../constants/api-response-messages';
// import PropertyServices from '../../../services/PropertyServices';
// import { showToast } from '@/utils/common-service';
// import ReactPlayer from 'react-player';

const imageArray = [
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrWxN3voOMIxw3vjj7buYSzyIvqFf05jrCg&s',
        alt: 'image 1',
    },
    {
        src: 'https://t4.ftcdn.net/jpg/03/70/64/43/360_F_370644357_MDF4UXLAXTyyi2OyuK66tWW9cA2f8svL.jpg',
        alt: 'image 2',
    },
    {
        src: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
        alt: 'image 3',
    },
    {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
        alt: 'image 4',
    },
];

const ImagesVideos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState(imageArray);
    const [videoArray, setVideoArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setPageTitle('Property Details'));
    // });
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        window['global'] = window;
    }, []);

    // property fetch api
    // const getOneProperty = async () => {
    //     try {
    //         const response = await PropertyServices.fetchSingleProperty(id);
    //         if (response) {
    //             setImages(response?.data?.data?.propertyfiles?.images);
    //             setVideoArray(response?.data?.data?.propertyfiles?.videos);
    //             setIsLoading(false);
    //         } else {
    //             throw new Error("INternal err");
    //         }
    //     } catch (error) {
    //         showToast('WARNING', "Internal err");
    //     }
    // };

    // useEffect(() => {
    //     getOneProperty();
    // }, []);

    return (
        <>
            <Breadcrumbs className='m-4'>
                <a href="#" className="opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mr-1 -mt-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v-2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>
                <a href="/property" className="opacity-60">
                    <span>Beach Front Villa</span>
                </a>
                <a href="#" className="opacity-60">
                    <span>Images & Videos</span>
                </a>
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
                                            // setIsOpen(true);
                                            setPhotoIndex(index);
                                        }}
                                    >
                                        <img src={`${item.src}`} alt={item.alt} data-fancybox="gallery" className="rounded-md w-full h-full object-cover" />
                                    </button>
                                );
                            })}
                    </div>

                    {isOpen && (
                        <Lightbox
                            mainSrc={images[photoIndex].src}
                            nextSrc={images[(photoIndex + 1) % images.length].src}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
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
