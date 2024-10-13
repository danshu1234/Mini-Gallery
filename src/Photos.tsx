import React, { ChangeEvent, FC, useEffect, useState } from "react"; 
interface Props {
    favorites: string[]
    setFavorites: Function
}
const Photos: FC <Props> = (props) => { 
    interface Comment {
        url: string,
        comments: string[]
    }
    const [image, setImage] =  useState <null | string> (null)
    const [photos, setPhotos] = useState <string[]> ([]) 
    const [like, setLike] = useState <boolean> (false)
    const [likes, setLikes] = useState <string[]> ([])
    const [comment, setComment] = useState <null | string> (null)
    const [comments, setComments] = useState <string[]> ([])
    const [input, setInput] = useState <string> ('')
    const [saveComments, setSaveComments] = useState <Comment[]> ([])
    const [quotaPhotos, setQuotaPhotos] = useState <boolean> (false)
    let likee;
    let nomore;
    if (quotaPhotos === true) {
        nomore = <div>
            <h1>Вы не можете добавить больше 9 фото</h1><span onClick={() => {
                setQuotaPhotos(false)
            }}>Понятно</span>
        </div>
    }
    useEffect(() => {
    if (image){
        const newComments: Comment = {
            url: image,
            comments: comments,
        } 
        const sameComments = saveComments.filter(item => item.url !== image)
        setSaveComments([newComments, ...sameComments])   
    }

    }, [comments])
    useEffect(() => {
        if (saveComments.length !== 0) {
            localStorage.setItem('comments', JSON.stringify(saveComments))
        }
    }, [saveComments])
    if (like) {
        likee = <div className="heart" onClick={() => {
            if (image) {
                const filterLikes = likes.filter(item => item !== image)
                setLikes(filterLikes)
                setLike(!like)
                const arrLikes = localStorage.getItem('likes')
            if (arrLikes) {
                localStorage.setItem('likes', JSON.stringify([...filterLikes]))
            } else {
                localStorage.setItem('likes', JSON.stringify([...filterLikes]))
            }
            }
            localStorage.setItem('like', JSON.stringify(!like))
        }}></div>
    } else {
        likee = <div className="heart-not-like" onClick={() => {
            if (image) {
                setLikes([...likes, image])
                setLike(!like)  
            }
            const arrLikes = localStorage.getItem('likes')
            if (arrLikes) {
                const resultLikes = JSON.parse(arrLikes)
                localStorage.setItem('likes', JSON.stringify([...resultLikes, image]))
            } else {
                localStorage.setItem('likes', JSON.stringify([image]))
            }
            localStorage.setItem('like', JSON.stringify(!like))
        }}></div>
    }
    let content;
    useEffect(() => {
        const allPhotos = localStorage.getItem('galary')
        if (allPhotos) {
            setPhotos(JSON.parse(allPhotos))
        }
        const isLike = localStorage.getItem('like')
        if (isLike) {
            setLike(JSON.parse(isLike))
        }
        const likesPhoto = localStorage.getItem('likes')
        if (likesPhoto) {
            setLikes(JSON.parse(likesPhoto))
        }
        const localComments = localStorage.getItem('comments')
        if (localComments){
            setSaveComments(JSON.parse(localComments))
        }
        }, [])
   if (image == null) {
    content = <div>
        <div> 
<input type="file" onChange={((event: ChangeEvent <HTMLInputElement>) => { 
        if (event.target.files !== null) { 
            const file = event.target.files[0] 
            const reader = new FileReader() 
            reader.readAsDataURL(file) 
            reader.onload = function () { 
                if (typeof reader.result === 'string'){ 
                const resultGalary = localStorage.getItem('galary')
                if (resultGalary !== null && photos.length < 9) {
                    const result = JSON.parse(resultGalary)
                    localStorage.setItem('galary', JSON.stringify([...result, reader.result]))
                } else if (resultGalary == null) {
                    localStorage.setItem('galary', JSON.stringify([reader.result]))
                }
                if (photos.length < 9){
                    setPhotos([...photos, reader.result]) 
                } else {
                    setQuotaPhotos(true)
                }
            }} 
        }  
    })}/> 
    <ul className="photos"> 
        {photos.map((item, index) => { 
            return <li key={index}><img src={item || ''} className="photo" onClick={((event: React.MouseEvent <HTMLImageElement>) => {
                    setImage(event.currentTarget.src)
                    const findLikes = likes.find(el => el == item)
                    if (findLikes == undefined) {
                        setLike(false)
                    } else {
                        setLike(true)
                    }
                    const findComments = saveComments.find(item => item.url === event.currentTarget.src)
                            if (findComments === undefined) {
                                setComments([])
                            } else {
                                setComments(findComments.comments)
                            }
            })}/></li> 
        })} 
    </ul> 
        </div> 
    </div> 
   } else if (image) {
    content = <div className="contain-image">
        <img src={image || ''} className="bigImg"/>
        <p onClick={() => {
            setImage(null)
            setComments([])
        }} className="back-to-photos">✕</p>
        <p className="delete" onClick={() => {
            const getStorage = localStorage.getItem('galary')
            if (getStorage) {
                const parseStorage = JSON.parse(getStorage) 
                localStorage.setItem('galary', JSON.stringify(parseStorage.filter((item: string) => item !== image)))
            }
            setPhotos(photos.filter((item) => item !== image))
            setImage(null)
            if (image) {
                const filterLikes = likes.filter(item => item !== image)
                setLikes(filterLikes)
                setLike(!like)
                const arrLikes = localStorage.getItem('likes')
            if (arrLikes) {
                localStorage.setItem('likes', JSON.stringify([...filterLikes]))
            } else {
                localStorage.setItem('likes', JSON.stringify([...filterLikes]))
            }
            }
            const newFavorites = props.favorites.filter((item) => item !== image)
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
            props.setFavorites(newFavorites)
        }}>Удалить фото</p>
        {likee}
        <div className="comment">
        <input onChange={((event: ChangeEvent <HTMLInputElement>) => {
            setComment(event.target.value)
            setInput(event.target.value)
        })} value={input}/>
        <button onClick={() => {
            if (comment !== null) {
                setComments([...comments, comment])
            }
            setComment(null)
            setInput('')
        }}>Сохранить</button>
        <div className="comments">
        <ul className="comments-style">
        {comments.map((item, index) => {
            return <li key={index} className="comment-style"><div><p>{item}</p><p onClick={() => {
                const deleteComment = comments.filter(el => el !== item)
                setComments(deleteComment)
            }} className="delete-comment">Удалить</p></div></li>
        })}
        </ul>
        </div>
        <button className="add-favorites" onClick={() => {
            const sameFavorites = props.favorites.find(item => item == image)
            if (sameFavorites == undefined) {
                props.setFavorites([...props.favorites, image])
                localStorage.setItem('favorites', JSON.stringify([...props.favorites, image]))
            }
        }}>Добавить в избранное</button>
        </div>
    </div>
   }
    return( 
        <div>
            {content}
            {nomore}
        </div>
    ) 
} 
 
export default Photos