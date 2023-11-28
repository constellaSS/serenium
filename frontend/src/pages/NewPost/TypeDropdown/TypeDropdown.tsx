import './TypeDropdown.css'
import React, {Dispatch, SetStateAction} from "react";

interface TypeSectionProps {
	threadType: string,
	setThreadType: React.Dispatch<SetStateAction<string>>
}


const TypeDropdown = ({threadType, setThreadType}: TypeSectionProps) => {
	const handleSelection = (type: string) => {
		setThreadType(type)
	}

	return (
		<div className={"type-selection-container"}>
			<div className={"challenge-section type-section"} >
				<input type={"radio"} name={"type-selection"} id={"challenge-input"} value={"Challenge"} className={"type-radio"} required onChange={(e) => {
					handleSelection(e.target.value);
				}}/>
				<label htmlFor={"challenge-input"} className={"type-post-label"}>
					Challenge
				</label>
			</div>
			<div className={"question-section type-section"}>
				<input type={"radio"} name={"type-selection"} id={"question-input"} className={"type-radio"} value={"Question"} required onChange={(e) => {
				handleSelection(e.target.value);
				}}/>
				<label>
					Question
				</label>
			</div>
		</div>
	)
}

export default TypeDropdown;