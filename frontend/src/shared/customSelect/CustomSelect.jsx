import Select, { components } from 'react-select';
import './customSelect.scss'

const selectStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: '100%',
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        marginTop: -8.5,
        padding: '0.625rem 0.625rem',
        border: '1px solid rgb(48, 48, 48)',
        boxShadow: 'none',
        borderRadius: '0 0 10px 10px',
        cursor: 'pointer'
    }),
    container: (provided, state) => ({
        ...provided,
        height: '3.3rem'
    }), 

    control: (provided, state) => ({
        borderColor: state.selectProps.error && !state.isFocused ? '#C30000' : 'auto',
        width: state.selectProps.width
    }), 
    
    option: (provided, state) => ({
        color: state.isSelected && state.selectProps.error ? '#C30000' : 'auto'
    }),

    placeholder: (provided, state) => ({
        ...provided,
        color: state.selectProps.error ? '#C30000' : '#979797;'
    }),
    
    singleValue: (provided, state) => ({
        ...provided,
        color: state.selectProps.error ? '#C30000' : 'auto'
    }),

    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.selectProps.error ? '#C30000' : 'rgba(48, 48, 48, 0.5)'
    }),

    indicatorSeparator: () => ({
        display: 'none'
    }),

    menuList: (provided) => ({
        ...provided,
        maxHeight: '150px',
    
        "::-webkit-scrollbar": {
          width: "4px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1"
        },
        "::-webkit-scrollbar-thumb": {
          background: "#a5a5a5"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#8a8a8a"
        }
    })
}

const currentYear = (new Date()).getFullYear();

const options = {
    'day': Array(31).fill(null).map((element, i, arr) => (
        arr[i] = {value: i + 1, label: i + 1}
    )),
    "month": [
        { value: 1, label: 'Январь' },
        { value: 2, label: 'Февраль' },
        { value: 3, label: 'Март' },
        { value: 4, label: 'Апрель' },
        { value: 5, label: 'Май' },
        { value: 6, label: 'Июнь' },
        { value: 7, label: 'Июль' },
        { value: 8, label: 'Август' },
        { value: 9, label: 'Сентябрь' },
        { value: 10, label: 'Октябрь' },
        { value: 11, label: 'Ноябрь' },
        { value: 12, label: 'Декабрь' }
    ],
    "year": Array(100).fill(null).map((element, i, arr) => (
        arr[i] = {value: currentYear - i, label: currentYear - i}
    )),
    "qualification": [
        { value: 'Бакалавр', label: 'Бакалавр' },
        { value: 'Специалист', label: 'Специалист' },
        { value: 'Магистр', label: 'Магистр' },
        { value: 'Доктор', label: 'Доктор' },
        { value: 'Кандидат', label: 'Кандидат' },
        { value: 'Профессор', label: 'Профессор' },
    ],
}

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <span style={{'fontSize': '25px', 'transform': 'scale(1, 0.5)', }}>V</span>
      </components.DropdownIndicator>
    );
  };

const FormikSelect = ({name, placeholder, error, value, onChange, onBlur}) => {
    return (
        <>
            <Select
                components={{ DropdownIndicator }}
                classNamePrefix='filter'
                error={error}
                styles={selectStyles}
                options={options[name]}
                placeholder={placeholder}
                noOptionsMessage={() => "Значений не найдено"}
                value={options[name].find(option => option.value === value) || ""}
                onChange={onChange}
                onBlur={onBlur(name)}
            />
            {error ? (<div className="group__error">{error}</div>) : null}
        </>
    )
}

const MutableSelect = ({name, placeholder, value, noOptionsMessage, onChange, width, startDate}) => {
    let mutableOptions = [];

    if(name) {
        mutableOptions = options[name];
    } else {
        mutableOptions = startDate ?  Array(currentYear - startDate + 2).fill(null).map((element, i, arr) => (
            i === 0 ? arr[i] = {value: null, label: "Настоящее время"} :
            arr[i] = {value: currentYear - i + 1, label: currentYear - i + 1}
        )) : [];
    }
    
    return (
        <Select
            components={{ DropdownIndicator }}
            classNamePrefix='filter'
            styles={selectStyles}
            options={mutableOptions}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            onChange={onChange}
            value={mutableOptions.find(option => option.value === value) || ""}
            width={width}
        />
    )
}

export default FormikSelect;
export {MutableSelect as MutableSelect}