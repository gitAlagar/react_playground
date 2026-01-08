import { useState } from 'react';
import "./style.css";

export const NormalLogin = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const skillList = ['react js', 'react native', 'js', 'ts'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            // add skill
            setSkills((prev) => [...prev, value]);
        } else {
            // remove skill
            setSkills((prev) => prev.filter((skill) => skill !== value));
        }
    };

    return (
        <div className='container'>
            {/* <select value={skills} onChange={handleChange}>
                <option value="react js">Recat js</option>
                <option value="react native">Native</option>
                <option value="js">JS</option>
                <option value="ts">TS</option>
            </select>
            {skills ? skills.map((skill) => <p key={skill}>{skill}</p>) : null} */}
            {
                skillList.map((s) => (
                    <div>
                        <input type="checkbox" value={s} checked={skills.includes(s)} onChange={handleChange} />
                        <label>{s}</label>
                    </div>
                ))
            };
            {
                skills && skills.map((s) => <p key={s}>{s}</p>)
            }
        </div>
    )
}
