import React from 'react';
import { Dropdown } from '../shared/dropdown/Dropdown';
import { useCurrency } from './Currencies';

export const CurrencyDropdown = () => {
    const { availableCurrencies, setCurrency } = useCurrency()
    return <>
        currency:
        {/* React.createElement(Dropdown, { items: availableCurrencies, ... }) */}
        <Dropdown
            items={availableCurrencies}
            // onChanged={value => {
            //     isCurrencyCode(value) && setCurrency(value)
            // }}
            onChanged={setCurrency}
        ></Dropdown>
    </>;
}
