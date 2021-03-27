import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Emails = () => {
    const [groups, setGroups] = useState([])
    const [email, setEmail] = useState('')
    const [selectedGroupId, setSelectedGroupId] = useState(-1)

    const jobs = useSelector(state => state.app.jobs)
    const candidates = useSelector(state => state.app.candidates)
    const dispatch = useDispatch()

    const generateEmails = () => {
        //// Groups candidates according to their elligable jobs ////

        // Captures all jobs eligable for each candidate
        const candidateJobs = []
        for (let i = 0; i < candidates.length; i++) {
            const obj = {'id': i, 'jobIds': []}
            for (let j = 0; j < jobs.length; j++) {
                const matches = candidates[i].candidateTags.filter(tag => jobs[j].jobTags.includes(tag))
                if (matches.length) obj.jobIds.push(j)
            }
            candidateJobs.push(obj)
        }

        // Adds candidate ids to joblists shared between candidates
        const jobGroups = []
        for (let i = 0; i < candidateJobs.length; i++) {
            let added = false
            for (let j = 0; j < jobGroups.length; j++) {
                if (JSON.stringify(candidateJobs[i].jobIds) === JSON.stringify(jobGroups[j].jobIds)) {
                    jobGroups[j].candidateIds.push(i)
                    added = true
                    break
                }
            }
            if (!added) jobGroups.push({'candidateIds': [i], 'jobIds': [...candidateJobs[i].jobIds]})
        }

        setGroups(jobGroups)
    }

    const generateEmail = (i) => {
        let html = ''
        for (const id in groups[i].jobIds) {
            html += jobs[id].company + '\n'
            html += jobs[id].title + '\n'
        }
        setEmail(html)
        setSelectedGroupId(i)
    }

    const allEmail = () => {
        let html = ''
        for (const job of jobs) {
            html += job.company + '\n'
            html += job.title + '\n'
        }
        setEmail(html)
        setSelectedGroupId(-1)
    }

    return (
        <div className="container emails-container">
            <h2>Emails</h2>
            <button className="add purple" onClick={() => generateEmails()}>Generate Emails</button>
            <div className="email-groups">
                {candidates.length ? <div style={selectedGroupId === -1 ? {border: '2px solid var(--purple)'} : {}} onClick={() => allEmail(-1)} className="email-group">All</div> : ''}
                {groups.map((group, i) =>
                    <div onClick={() => generateEmail(i)} className="email-group" key={i}>
                        {group.candidateIds.map((candidate, j) =>
                            <div key={j}>{candidates[candidate].name}</div>
                        )}
                    </div>
                )}
            </div>
            {selectedGroupId >= 0 ?
                <div className="email-list">
                    {groups[selectedGroupId].candidateIds.map((id, i) =>
                        <div key={i}>{candidates[id].email}{id}</div>
                    )}
                </div>
            :
                <div className="email-list">
                    {candidates.map((candidate, i) =>
                        <div key={i}>{candidate.email}</div>
                    )}
                </div>
            }
            <div className="email">{email}</div>
        </div>
    )
}

export default Emails
