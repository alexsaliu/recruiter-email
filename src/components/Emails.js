import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { generateEmailHtml } from '../emailGenerator.js'

const Emails = () => {
    const [groups, setGroups] = useState([])
    const [email, setEmail] = useState('')
    const [selectedGroupId, setSelectedGroupId] = useState(-2)

    const emailRef = useRef(null)

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
        setSelectedGroupId(-2)
        setEmail('')
    }

    const generateEmail = (i) => {
        const emailJobs = groups[i].jobIds.map(id => jobs[id])
        setEmail(generateEmailHtml(emailJobs))
        setSelectedGroupId(i)
    }

    const allEmail = () => {
        setEmail(generateEmailHtml(jobs))
        setSelectedGroupId(-1)
    }

    const copyEmail = (e) => {
        let str = email
        function listener(e) {
          e.clipboardData.setData("text/html", str)
          e.clipboardData.setData("text/plain", str)
          e.preventDefault()
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    }

    return (
        <div className="container emails-container">
            <h2>Emails</h2>
            <button className="add purple" onClick={() => generateEmails()}>Generate Email Groups</button>
            <div className="email-groups">
                {candidates.length ? <button style={selectedGroupId === -1 ? {border: '2px solid var(--purple)'} : {}} onClick={() => allEmail(-1)} className="email-group hollow">All</button> : ''}
                {groups.map((group, i) =>
                    <button onClick={() => generateEmail(i)} className="email-group hollow" key={i} style={selectedGroupId === i ? {border: '2px solid var(--purple)'} : {}}>
                        {group.candidateIds.map((candidate, j) =>
                            <div key={j}>{candidates[candidate].name}</div>
                        )}
                    </button>
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
                    {selectedGroupId > -2 ? candidates.map((candidate, i) =>
                        <div key={i}>{candidate.email}</div>
                    ) : ''}
                </div>
            }
            {email ? <div ref={emailRef} className="email" dangerouslySetInnerHTML={{__html: email}}></div> : ''}
            <button className="add purple" onClick={(e) => copyEmail(e)}>Copy Email</button>
        </div>
    )
}

export default Emails
