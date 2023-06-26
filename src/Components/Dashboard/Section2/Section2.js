import React from 'react'
import NewlyRegisterCorp from './Components/NewlyRegisterCorp'
import NewlyRegisterUniv from './Components/NewlyRegisterUniv'

const Section2 = (props) => {
    return (
        <div className='section2'>
            <div className='row'>
                <NewlyRegisterCorp allCorporates={props.allCorporates} getAllCorporate={props.getAllCorporate} />
                <NewlyRegisterUniv allUniversities={props.allUniversities} getAllUniversity={props.getAllUniversity} />
            </div>
        </div>
    )
}

export default Section2;