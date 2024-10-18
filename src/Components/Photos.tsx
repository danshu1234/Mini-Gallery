import React, { ChangeEvent, FC, useEffect, useState } from "react"; 
import '../Styles/Photos.css'
interface Props {
    favorites: string[]
    setFavorites: Function
}

const Photos: FC<Props> = (props) => { 
    interface Comment {
        url: string,
        comments: string[]
    }

    const [image, setImage] = useState<null | string>(null);
    const [photos, setPhotos] = useState<string[]>([]); 
    const [like, setLike] = useState<boolean>(false);
    const [likes, setLikes] = useState<string[]>([]);
    const [comment, setComment] = useState<null | string>(null);
    const [comments, setComments] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [saveComments, setSaveComments] = useState<Comment[]>([]);
    const [quotaPhotos, setQuotaPhotos] = useState<string>('none');
 let likee;
    let nomore;
    if (quotaPhotos === 'same') {
        nomore = (
            <div className="quota">
                <p>У вас в галлерее уже есть это фото</p>
                <span onClick={() => {
                    setQuotaPhotos('none');
                }} className="ok">Понятно</span>
            </div>
        );
    } else if (quotaPhotos === 'full') {
        nomore = (
            <div className="quota">
                <p>Ой, похоже хранилище переполнено, попоробуйте добавить другой файл, или освободите место</p>
                <span onClick={() => {
                    setQuotaPhotos('none')
                }} className="ok">Понятно</span>
            </div>
        )
    } else if (quotaPhotos == 'blob') {
        <div className="quota">
                <p>Похоже этот формат не поддерживается</p>
                <span onClick={() => {
                    setQuotaPhotos('none')
                }} className="ok">Понятно</span>
            </div>
    }
    useEffect(() => {
        if (image) {
            const newComments: Comment = {
                url: image,
                comments: comments,
            }; 
            const sameComments = saveComments.filter(item => item.url !== image);
            setSaveComments([newComments, ...sameComments]); }
    }, [comments]);
    useEffect(() => {
        if (saveComments.length !== 0) {
            localStorage.setItem('comments', JSON.stringify(saveComments));
        }
    }, [saveComments]);

    if (like) {
        likee = (
            <div className="heart" onClick={() => {
                if (image) {
                    const filterLikes = likes.filter(item => item !== image);
                    setLikes(filterLikes);
                    setLike(!like);
                    localStorage.setItem('likes', JSON.stringify([...filterLikes]));
                }
                localStorage.setItem('like', JSON.stringify(!like));
            }}></div>
        );
    } else {
        likee = (
            <div className="heart-not-like" onClick={() => {
                if (image) {
                    setLikes([...likes, image]);
                    setLike(!like); const arrLikes = localStorage.getItem('likes');
                    if (arrLikes) {
                        const resultLikes = JSON.parse(arrLikes);
                        localStorage.setItem('likes', JSON.stringify([...resultLikes, image]));
                    } else {
                        localStorage.setItem('likes', JSON.stringify([image]));
                    }
                }
                localStorage.setItem('like', JSON.stringify(!like));
            }}></div>
        );
    }

    let content;

    useEffect(() => {
        const allPhotos = localStorage.getItem('gallery');
        if (allPhotos) {
            setPhotos(JSON.parse(allPhotos));
        }
        const isLike = localStorage.getItem('like');
        if (isLike) {
            setLike(JSON.parse(isLike));
        }
        const likesPhoto = localStorage.getItem('likes');
        if (likesPhoto) {
            setLikes(JSON.parse(likesPhoto));
        }
        const localComments = localStorage.getItem('comments');
        if (localComments) {
            setSaveComments(JSON.parse(localComments));
        }
    }, []);
    if (image == null) {
        content = (
            <div className="contain-photos">
                <div> 
                    <label className="custom-file-upload">
                        Добавить фото <input type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => { if (event.target.files !== null) { 
                                    const file = event.target.files[0]; 
                                    if (file instanceof Blob)  {
                                        const reader = new FileReader()                             
                                    reader.readAsDataURL(file); reader.onload = function () { 
                                        if (typeof reader.result === 'string') { 
                                            const findPhoto = photos.find(el => el == reader.result)
                                            const resultgallery = localStorage.getItem('gallery');
                                            if (findPhoto == undefined) {
                                            if (resultgallery !== null) {        
                                                try {
                                                const result = JSON.parse(resultgallery);
                                                localStorage.setItem('gallery', JSON.stringify([...result, reader.result]));
                                                setPhotos([...photos, reader.result])
                                                }  catch (e) {
                                                    setQuotaPhotos('full')
                                                }                                                                                
                                            } else if (resultgallery == null) {
                                                localStorage.setItem('gallery', JSON.stringify([reader.result]));
                                            }                                                                                                                       
                                        } else {
                                            setQuotaPhotos('same')
                                        }
                                    } 
                                    }
                                    } else {
                                        setQuotaPhotos('blob')
                                    }                            
                                } }} 
                        /> </label>
                    <ul className="photos"> 
                        {photos.map((item, index) => { 
                            return (
                                <li key={index}>
                                    <img src={item || ''} className="photo" 
                                        onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                                            setImage(event.currentTarget.src);
                                            const findLikes = likes.find(el => el === item);
                                            setLike(findLikes !== undefined);
                                            const findComments = saveComments.find(item => item.url === event.currentTarget.src);
                                            setComments(findComments ? findComments.comments : []);
                                        }}
                                    />
                                </li> 
                            );
                        })} 
                    </ul> </div> 
            </div> ); 
    } else if (image) {
        content = (
            <div className="contain-image">
                <img src={image || ''} className="bigImg"/>
                <p onClick={() => {
                    setImage(null);
                    setComments([]);
                }} className="back-to-photos">✕</p>
                <p className="delete-photo" onClick={() => {
                    const getStorage = localStorage.getItem('gallery');
                    if (getStorage) {
                        const parseStorage = JSON.parse(getStorage); localStorage.setItem('gallery', JSON.stringify(parseStorage.filter((item: string) => item !== image)));
                    }
                    const notDeletePhotos = photos.filter(item => item !== image)   
                    setPhotos(notDeletePhotos)                 
                    setImage(null);
                    setSaveComments(saveComments.filter(el => el.url !== image))
                    if (image) {
                        const filterLikes = likes.filter(item => item !== image);
                        setLikes(filterLikes);
                        localStorage.setItem('likes', JSON.stringify([...filterLikes]));
                    }
                    const newFavorites = props.favorites.filter((item) => item !== image);
                    localStorage.setItem('favorites', JSON.stringify(newFavorites));
                    props.setFavorites(newFavorites);
                }}>Удалить фото</p>
                {likee}
                <div className="comment">
                    <input onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setComment(event.target.value);
                        setInput(event.target.value);
                    }} value={input} placeholder="Комментарий" className="comment-input"/>
                    <button onClick={() => {
                        if (comment !== null) {
                            setComments([...comments, comment]);
                        }
                        setComment(null);
                        setInput('');
                    }} className="save-comment">Сохранить</button>
                    <div className="comments">
                        <ul className="comments-style">
                            {comments.map((item, index) => {
                                return (
                                    <li key={index} className="comment-style">
                                        <div className="main-comments">
                                            <span>{item}</span>
                                            <p onClick={() => {
                                                const notDeleteComments = comments.filter(el => el !== item);
                                                const deleteComments = comments.filter(el => el == item)
                                                deleteComments.splice(-1, 1)
                                                const withoutDelete = [...notDeleteComments, ...deleteComments]
                                                setComments(withoutDelete)
                                            }} className="delete-comment">Удалить</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <button className="add-favorites" onClick={() => {
                        const sameFavorites = props.favorites.find(item => item === image);
                        if (sameFavorites === undefined) {
                            props.setFavorites([...props.favorites, image]);
                            localStorage.setItem('favorites', JSON.stringify([...props.favorites, image]));
                        }
                    }}>Добавить в избранное</button>
                </div>
            </div>
        );
    }

    return ( 
        <div>
            {content}
            {nomore}
        </div>
    ); 
} 

export default Photos;
