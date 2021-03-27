import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    updateCandidates
} from '../store/actions.js'


const Candidates = () => {
    const [addNewCandidate, setAddNewCandidate] = useState(false)
    const [candidateTags, setCandidateTags] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')
    const [link, setLink] = useState('')
    const [noOfTags, setNoOfTags] = useState(0)

    const candidates = useSelector(state => state.app.candidates)
    const tags = useSelector(state => state.app.tags)
    const dispatch = useDispatch()

    useEffect(() => {
        if (tags.length < noOfTags) maintainTags()
        setNoOfTags(tags.length)
    }, [tags])

    const maintainTags = () => {
        const candidatesCopy = [...candidates]
        for (const candidate of candidates) {
            const removedTag = candidate.candidateTags.filter((tag, i) => !tags.includes(tag))
            candidate.candidateTags.splice(candidate.candidateTags.indexOf(removedTag), 1)
        }
        dispatch(updateCandidates(candidatesCopy))
    }

    const addCandidate = () => {
        if (!name || !candidateTags.length) return
        let newCandidates = [...candidates]
        newCandidates.push({
            name,
            email,
            phone,
            notes,
            candidateTags,
            link
        })
        dispatch(updateCandidates(newCandidates))

        setName('')
        setEmail('')
        setPhone('')
        setNotes('')
        setLink('')
        setCandidateTags([])
        setAddNewCandidate(false)
    }

    const deleteCandidate = (id) => {
        let newCandidates = [...candidates]
        newCandidates.splice(id, 1)
        dispatch(updateCandidates(newCandidates))
    }

    const handelTag = (tag) => {
        let newTags = [...candidateTags]
        if (newTags.includes(tag)) {
            newTags = newTags.filter((x) => x !== tag)
        }
        else {
            newTags.push(tag)
        }
        setCandidateTags(newTags)
    }

    return (
        <div className="container candidates-container">
            <h2>Candidates</h2>
            {addNewCandidate ?
                <div className="create-candidate">
                    <div>New Candidate</div>
                    Name <input onChange={(e) => setName(e.target.value)} type="text" value={name} />
                    Email <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
                    Phone <input onChange={(e) => setPhone(e.target.value)} type="text" value={phone} />
                    Notes <input onChange={(e) => setNotes(e.target.value)} type="text" value={notes} />
                    Link <input onChange={(e) => setLink(e.target.value)} type="text" value={link} />

                    <div>Tags
                        {tags.map((tag, i) =>
                            <button onClick={() => handelTag(tag)} className={candidateTags.includes(tag) ? 'yellow' : 'hollow'} key={i}>{tag}</button>
                        )}
                    </div>
                    <button className="green add" onClick={() => addCandidate()}>Add +</button>
                </div>
            :
                <div onClick={() => setAddNewCandidate(true)} className="add-candidate">Add New Candidate +</div>
            }

            <div className="candidates">
                {candidates.map((candidate, i) =>
                    <div key={i} className="candidate">
                        <div><b>Name:</b> {candidate.name}</div>
                        <div>Id: {i}</div>
                        <div>Email: {candidate.email}</div>
                        <div>Phone: {candidate.phone}</div>
                        <div>Notes: {candidate.notes}</div>
                        <div>Tags:
                            {candidate.candidateTags.map((tag, i) =>
                                <span key={i}>{tag}</span>
                            )}
                        </div>
                        <a href={candidate.link} target="_blank">{candidate.link}</a>
                        <button className="delete" onClick={() => deleteCandidate(i)}>X</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Candidates
