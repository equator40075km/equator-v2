import React from 'react'
import ReactSelect from 'react-select'

function Select({...props}) {
    return (
        <ReactSelect
            {...props}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: 'var(--equator-green)',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: 'var(--equator-green-hover)'
                    },
                }),
                indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: 'var(--equator-green)',
                }),
                dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: 'var(--equator-green)',
                    '&:hover': {
                        color: 'var(--equator-green-hover)'
                    },
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: 'var(--chakra-font-sizes-sm)',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--equator-green)',
                    boxShadow: 'none',
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: 'var(--chakra-font-sizes-sm)',
                    borderRadius: 'var(--border-radius)',
                    color: state.isSelected
                        ? 'white'
                        : state.isFocused
                            ? 'white'
                            : 'black',
                    backgroundColor: state.isSelected
                        ? 'var(--equator-green)'
                        : state.isFocused
                            ? 'var(--equator-green-hover)'
                            : 'white',
                    '&:active': {
                        backgroundColor: 'var(--equator-green)',
                        color: 'white',
                    },
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: 'var(--chakra-font-sizes-sm)',
                    fontWeight: 'bold',
                    padding: '0 12px',
                    color: 'var(--equator-green)',
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: 'var(--chakra-font-sizes-sm)',
                    padding: '0 12px',
                    color: 'var(--equator-green)',
                    opacity: 0.6,
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: 'var(--chakra-font-sizes-sm)',
                    fontWeight: 'bold',
                    color: 'var(--equator-green)',
                    padding: '0 12px',
                })
            }}
        />
    )
}

export default Select
