const template = `
<table style="width: 400px;">
    <tr>
        <td style="border:1px solid lightgrey; padding: 14px;">
            <table>
                <tr>
                    <td style="font-family: 'arial'; color: #333333;">Alcidion - <b>Javascript engineer</b></td>
                </tr>
                <tr>
                    <td style="font-family: 'arial'; font-size: 12px; color:#525252; padding: 8px 0;">Front end rol foe a dude with a lot of experience. This job has banign percs ya feel? Seriously its crazy. You'll love this one man ooooff!</td>
                </tr>
                <tr>
                    <td style="font-family: 'arial'; font-size: 11px;"><span style="background: #ffd834; padding: 2px 4px; border-radius: 3px; color: #333333; margin-right: 4px;">Frontend</span></td>
                </tr>
                <tr>
                    <td style="font-family: 'arial'; font-size: 12px; padding-top: 5px;"><a href="www.google.com">www.google.com</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`

export const generateEmailHtml = (jobs) => {
    let html = `<table style="width: 400px;">`
    for (const job of jobs) {
        html += '<tr><td style="border:1px solid lightgrey; padding: 14px;"><table>'
        html += `<tr><td style="font-family: 'arial'; color: #333333;">${job.company} - <b>${job.title}</b></td></tr>`
        html += `<tr><td style="font-family: 'arial'; font-size: 12px; color:#525252; padding: 8px 0;">${job.description}</td></tr>`
        html += `<tr><td style="font-family: 'arial'; font-size: 11px;">`
        for (const tag of job.jobTags) {
            html += `<span style="background: #ffd834; padding: 2px 4px; border-radius: 3px; color: #333333; margin-right: 4px;">${tag}</span>`
        }
        html += '</td></tr>'
        html += `<tr><td style="font-family: 'arial'; font-size: 12px; padding-top: 5px;"><a href="${job.link}" target="_blank">${job.link}</a></td></tr>`
        html += '</table></td></tr>'
    }
    html += '</table>'
    return html
}
