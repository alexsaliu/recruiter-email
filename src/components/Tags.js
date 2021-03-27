import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    updateTags
} from '../store/actions.js'

const Tags = () => {
    const [tag, setTag] = useState('')
    const [deleting, setDeleting] = useState(false)

    const tags = useSelector(state => state.app.tags)
    const dispatch = useDispatch()

    const addTag = (tag) => {
        if (!tag) return
        let newTags = [...tags]
        newTags.push(tag)
        dispatch(updateTags(newTags))
        setTag('')
    }

    const deleteTag = (id) => {
        let newTags = [...tags]
        newTags.splice(id, 1)
        dispatch(updateTags(newTags))
    }

    return (
        <div className="container tags-container">
            <h2>Tags</h2>
            New Tag <input onChange={(e) => setTag(e.target.value)} type="text" value={tag} />
            <button className="yellow add" onClick={() => addTag(tag)}>Add +</button>
            <button className={deleting ? 'delete' : ''} onClick={() => setDeleting(!deleting)}>Turn {deleting ? 'off' : 'on'} delete mode</button>

            <div className="tags">
                {tags.map((tag, i) =>
                    <div key={i} className="tag">
                        <div>{tag}</div>
                        {deleting ? <button className="delete" onClick={() => deleteTag(i)}>X</button> : ''}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Tags
