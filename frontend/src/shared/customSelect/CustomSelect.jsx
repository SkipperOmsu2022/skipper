import Select from 'react-select';
import './customSelect.scss'

const selectStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: '15.5rem',
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
        borderColor: state.selectProps.error && !state.isFocused ? '#C30000' : 'auto'
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

    dropdownIndicator: () => ({
        display: 'none'
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
    day: Array(31).fill(null).map((element, i, arr) => (
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
    ))
}

const CustomSelect = ({name, placeholder, error, value, onChange, onBlur}) => {
    return (
        <Select
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
    )
}

export default CustomSelect;