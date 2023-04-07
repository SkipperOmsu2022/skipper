import {MutableSelect, CustomAsyncSelect} from "../../../shared/customSelect/CustomSelect";

const MentorEducation = ({store}) => {
    return (
        <div className="settings__input-group">
            <label className="settings__input-group-label middle-top-padding">
                Образование: 
            </label>
            <div className="education-group">
                {store.education.length ? null :
                    <button className="button settings__input-group-button" onClick={store.addEducation}>
                        +
                    </button>
                }
                {store.education.map((item, i) => (
                    <div className="education" key={item.id}>
                        <div className="settings__input-group-box">
                            <div className="group">
                                <MutableSelect
                                    name="year"
                                    placeholder="Год начала"
                                    value={item.yearStart + ''}
                                    onChange={(e) => {
                                        store.setEducation(e, i, 'yearStart')
                                    }}
                                    error={item.error[0] && store.dirty}
                                />
                            </div>
                            <div className="group">
                                <MutableSelect
                                    name="yearOfEnd"
                                    placeholder="Год окончания"
                                    noOptionsMessage={"Выберите год начала"}
                                    value={item.yearEnd}
                                    startDate={item.yearStart}
                                    onChange={(e) => {
                                        store.setEducation(e, i, 'yearEnd')
                                    }}
                                    error={item.error[0] && store.dirty}
                                />
                            </div>
                            <div className="group" >
                                <CustomAsyncSelect
                                    placeholder="Квалификация"
                                    value={item.label && item}
                                    noOptionsMessage={item.noOptionsMessage}
                                    onChange={(e) => {
                                        store.setEducation(e, i, 'qualification')
                                    }}
                                    width='30.15rem'
                                    promiseOptions={(e) => store.setQualificationOptions(e, i)}
                                    error={item.error[1] && store.dirty}
                                />
                            </div>
                            <div className="textarea-wrapper group">
                                <textarea
                                    className={`settings__input-group-text input textarea small
                                        ${item.error[2] && store.dirty ? 'error' : ''}`}
                                    placeholder="Учебное заведение:"
                                    id="aboutMe"
                                    maxLength='100'
                                    value={item.educationalInstitution}
                                    onChange={(e) => {
                                        store.setEducation(e.target, i, 'educationalInstitution')
                                    }}
                                />
                            </div>
                            {item.error.includes(true) && store.dirty ? 
                                <div className="group-error">Заполните все поля</div>
                                :null
                            }
                        </div>
                        <div className='wrapper'>
                            <span
                                className="settings__input-group-btn-width settings__input-group-delete"
                                onClick={() => store.removeEducation(i)}
                            >
                                Удалить
                            </span>
                            {store.education.length - 1 === i ?
                                <button
                                    className={`button settings__input-group-button 
                                        ${item.error.includes(true) && store.dirty ? 'mrgn-btm' : ''}`}
                                    onClick={store.addEducation}
                                >
                                    +
                                </button> 
                                : null
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MentorEducation;