// JavaScript Code

let subjects = [];

function generateSubjectInputs() {
    const subjectCount = document.getElementById('subjectCount').value;
    const subjectsDiv = document.getElementById('subjects');
    subjectsDiv.innerHTML = '';
    subjects = [];

    for (let i = 1; i <= subjectCount; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'form-group';
        subjectDiv.innerHTML = `<input type='text' placeholder='Subject ${i} Name' class='form-control subject-name' /><br><input type='number' placeholder='Enter Marks' class='form-control subject-marks' />`;
        subjectsDiv.appendChild(subjectDiv);
    }

    document.getElementById('subjectInputSection').style.display = 'block';
}

function getGrade(marks) {
    if (marks >= 91 && marks <= 100) return 'Outstanding';
    if (marks >= 82 && marks <= 90) return 'A+';
    if (marks >= 73 && marks <= 81) return 'A';
    if (marks >= 64 && marks <= 72) return 'B+';
    if (marks >= 55 && marks <= 63) return 'B';
    if (marks >= 46 && marks <= 54) return 'C+';
    if (marks >= 35 && marks <= 45) return 'C';
    return 'F';
}

function getOverallGrade(percentage) {
    if (percentage >= 91) return 'Outstanding';
    if (percentage >= 82) return 'A+';
    if (percentage >= 73) return 'A';
    if (percentage >= 64) return 'B+';
    if (percentage >= 55) return 'B';
    if (percentage >= 46) return 'C+';
    if (percentage >= 35) return 'C';
    return 'Fail';
}

function calculate() {
    const studentName = document.getElementById('studentName').value;
    const subjectNames = document.getElementsByClassName('subject-name');
    const subjectMarks = document.getElementsByClassName('subject-marks');

    let totalMarks = 0;
    let isFailed = false;

    subjects = [];

    for (let i = 0; i < subjectNames.length; i++) {
        const name = subjectNames[i].value || `Subject ${i + 1}`;
        const marks = parseInt(subjectMarks[i].value);
        const grade = getGrade(marks);

        if (marks < 35) {
            isFailed = true;
        }

        totalMarks += marks;
        subjects.push({ name, marks, grade });
    }

    document.getElementById('subjectInputSection').style.display = 'none';
    document.getElementById('subjects').innerHTML = '';

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const percentage = (totalMarks / (subjects.length * 100)) * 100;
    const overallGrade = isFailed ? 'Fail' : getOverallGrade(percentage);
    const displayPercentage = isFailed ? 'NA' : `${percentage.toFixed(2)}%`;

    let reportHTML = `<div class='progress-report'>
                        <h2>${studentName}'s Progress Report</h2>
                        <table>
                            <thead>
                                <tr><th>Subject</th><th>Marks</th><th>Grade</th></tr>
                            </thead>
                            <tbody>`;

    subjects.forEach(subject => {
        reportHTML += `<tr><td>${subject.name}</td><td>${subject.marks}</td><td>${subject.grade}</td></tr>`;
    });

    reportHTML += `</tbody>
                   </table>
                   <div class='percentage'>Percentage: ${displayPercentage} | Overall Grade: ${overallGrade}</div>
                   </div>`;

    resultDiv.innerHTML = reportHTML;
}

// Minor change to ensure update is applied.
