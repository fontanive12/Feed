import { useState } from 'react';
import styles from './index.module.css';
import { Comments } from '../Comments';
import { Avatar } from '../Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export function Post({ author, content, publishedAt }) {
    const [comments, setComments] = useState(["Que legal, adorei sua postagem!"]);
    const [newComment, setNewComment] = useState('')


    const publishedDateFormatted = format(
        new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr,
    }
    );

    const publishDateRelativeToNow = formatDistanceToNow(
        new Date(publishedAt), {
        locale: ptBr,
        addSuffix: true,
    }
    )

    function handleCreateNewComment(e) {
        e.preventDefault();
        setComments([...comments, newComment]);

        setNewComment('')
    }

    function handleNewCommentChange() {
        setNewComment(event.target.value);
    }

    function deleteComment(commentToDelete) {
        const newCommentListWithoutDelete = comments.filter((comment) => {
            return comment !== commentToDelete;
        });
        setComments(newCommentListWithoutDelete);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.profile}>
                    <Avatar hasBorder={true} src={author.avatarUrl} />

                    <div className={styles.description}>
                        <strong>{author.name}</strong>
                        <span>
                            {author.role}
                        </span>
                    </div>
                </div>
                <time
                    title={publishedDateFormatted}
                    dateTime={new Date(publishedAt).toISOString()}>
                    Publicado {publishDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    switch (line.type) {
                        case 'paragraph':
                            return <p>{line.content}</p>;
                        case 'link':
                            return <p><a href="#">{line.content}</a></p>
                        default:
                            return ""
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment}>
                <strong>Deixe seu feedback</strong>

                <textarea name="comment" value={newComment} onChange={handleNewCommentChange} placeholder="Deixe um comentário" />

                <button type="submit">Publicar</button>
            </form>


            <div className={styles.comments}>
                {comments.map((comment) => {
                    return (<Comments deleteComment={deleteComment} content={comment} />)
                })}
            </div>
        </article>
    );
}
