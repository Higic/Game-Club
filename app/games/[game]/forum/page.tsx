

/**
 * Forum main page
 */
import ForumPostForm from './ForumPostForm'
import ForumPost from './forumPost'
export default function Page() {
    return (
        <div>
            <ForumPostForm/>
            <div className='mainContent'>
                <ForumPost></ForumPost>
            </div>
        </div>
    )
}
