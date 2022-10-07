import styles from './index.module.css';
import commentImage from '../../assets/comment1.png'
import frameImage from '../../assets/Frame.png'
import vectorImage from '../../assets/Vector(2).png';
import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from '../Avatar';

// interface Content {
//     type: "paragraph" | "link";
//     content: string;
// }

// interface PostProps{
//     content: Content[];
//     deleteComment: string;
// }

export function Comments({ content, deleteComment }) {

    const [likes, setLikes] = useState(0);

    function handleDeleteComment() {
        deleteComment(content);
    }

    function handleNewLike() {
       setLikes = likes + 1;     
    }

    return (
        <article className={styles.comments}>
            <div className={styles.comment1}>
                <img src={commentImage} alt='imagem foto do usuário'></img>
                <div className={styles.comment}>
                    <div className={styles.description}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>Wade Warren</strong>
                                <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">
                                    Comentado há 1h
                                </time>
                            </div>

                            <button className={styles.delete} title="Deletar comentário" onClick={handleDeleteComment}>
                                <Trash size={24} />
                            </button>

                        </header>
                        <p>{content}</p>

                    </div>
                    <footer>
                        <button onClick={handleNewLike}>
                            <ThumbsUp />
                            <span>{likes}</span>
                        </button>
                    </footer>
                </div>
            </div>
        </article>
    );
};