import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
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
        height: state.selectProps.minHeight || '3.3rem'
    }), 

    control: (provided, state) => ({
        borderColor: state.selectProps.error && !state.isFocused ? '#C30000' : 'auto',
        width: state.selectProps.width,
        height: state.selectProps.minHeight || '1.9rem'
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
    }),

    multiValueLabel: (provided, state) => ({
        ...provided,
        fontSize: 'auto',
        backgroundColor: 'white'
    }),
    
    multiValue: (provided, state) => ({
        ...provided,
        border: '1px solid rgb(230, 230, 230)',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: '#FFF5C2',
        color: '#979797'
    })
}

const currentYear = (new Date()).getFullYear();

const options = {
    'day': Array(31).fill(null).map((element, i, arr) => (
        arr[i] = {value: ('0' + (i + 1)).slice(-2), label: i + 1}
    )),
    "month": [
        { value: '01', label: 'Январь' },
        { value: '02', label: 'Февраль' },
        { value: '03', label: 'Март' },
        { value: '04', label: 'Апрель' },
        { value: '05', label: 'Май' },
        { value: '06', label: 'Июнь' },
        { value: '07', label: 'Июль' },
        { value: '08', label: 'Август' },
        { value: '09', label: 'Сентябрь' },
        { value: '10', label: 'Октябрь' },
        { value: '11', label: 'Ноябрь' },
        { value: '12', label: 'Декабрь' }
    ],
    "year": Array(100).fill(null).map((element, i, arr) => (
        arr[i] = {value: '' + (currentYear - i), label: currentYear - i}
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
                value={options[name]?.find(option => option.value === value) || ""}
                onChange={onChange}
                onBlur={onBlur(name)}
            />
            {error ? (<div className="group__error">{error}</div>) : null}
        </>
    )
}

const MutableSelect = ({name, placeholder, value, noOptionsMessage, onChange, width, height, startDate}) => {
    let mutableOptions = [];

    if(name === "yearOfEnd") {
        mutableOptions = startDate !== null ? Array(currentYear - startDate + 2).fill(null).map((element, i, arr) => (
            i === 0 ? arr[i] = {value: null, label: "Настоящее время"} :
            arr[i] = {value: currentYear - i + 1, label: currentYear - i + 1}
        )) : [];
    } else {
        mutableOptions = options[name];
    }
    
    return (
        <Select
            components={{ DropdownIndicator }}
            classNamePrefix='filter'
            styles={selectStyles}
            options={mutableOptions}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage || "Значений не найдено"}
            onChange={onChange}
            value={mutableOptions?.find(option => option.value === value) || ""}
            width={width}
            height={height}
        />
    )
}

const MultipleSelect = ({placeholder, value, onChange, noOptionsMessage, width, minHeight, multipleOptions}) => {
    return (
        <Select
            components={{ DropdownIndicator }}
            classNamePrefix='filter'
            styles={selectStyles}
            options={multipleOptions}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            onChange={onChange}
            value={value}
            width={width}   
            minHeight={minHeight}
            isMulti
        />
    )
}

const CustomAsyncSelect = ({placeholder, value, noOptionsMessage, onChange, width, height, promiseOptions}) => {
    return (
        <AsyncSelect
            components={{ DropdownIndicator }}
            classNamePrefix='filter'
            styles={selectStyles}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage || "Значений не найдено"}
            onChange={onChange}
            value={value}
            width={width}
            height={height}
            defaultOptions
            loadOptions={promiseOptions}
        />
    )
} 



export default FormikSelect;
export {MutableSelect, MultipleSelect, CustomAsyncSelect}