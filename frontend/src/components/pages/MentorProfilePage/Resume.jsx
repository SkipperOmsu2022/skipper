import { observer } from "mobx-react-lite";
import mentorProfileStore from '../../../store/mentorProfileStore';

const Resume = observer(() => {
    return (
        <div className="app-section profile mentor">
            <div className="profile__header">Резюме</div>
            <div className="profile__resume">
                <div className="profile__resume-row">
                    <div className="profile__resume-header">Образование</div>
                    <div className="profile__resume-header">Опыт работы</div>
                    <div className="profile__resume-header">Сертификаты</div>
                </div>
                <div className="profile__divider padding"></div>
                <div className="profile__resume-row">
                    <div className="profile__resume-column">
                        <Educations educations={mentorProfileStore.educations}/>
                    </div>
                    <div className="profile__resume-column">
                        <Experiences experiences={mentorProfileStore.workExperiences}/>
                    </div>
                    <div className="profile__resume-column">
                        <Certificates certificates={mentorProfileStore.certificatesResource}/>
                    </div>
                </div>
            </div>
        </div>
    )
})

const Educations = ({educations}) => {
    const getQualification = (item) => {
        return item.substring(item.indexOf(' ') + 1)
    }

    return educations.map((item, i) => (
        <div className="profile__resume-column-text" key={i}>
            {getDateRange(item)} <br/> {getQualification(item.qualificationNameWithCode)}, <br/> {item.educationalInstitution}
        </div>
    ))
}

const Experiences = ({experiences}) => {
    return experiences.map((item, i) => (
        <div className="profile__resume-column-text" key={i}>
            {getDateRange(item)} <br/> {item.placeOfWork}
        </div>
    ))
}

const Certificates = ({certificates}) => {
    return certificates.map((item, i) => (
        <div className="profile__resume-column-wrapper" key={i}>
            <img className="profile__resume-column-image" src={item} alt="certificate" />
        </div>
    ))
}

const getDateRange = (item) => {
    return `${item.yearStart} - ${item.yearEnd || 'Настоящее время'}`
}

export default Resume;