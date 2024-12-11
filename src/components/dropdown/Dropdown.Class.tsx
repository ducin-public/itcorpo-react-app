import React, { ChangeEvent } from 'react'

type DropdownProps = {
  items: { [key: string]: string }
  onChanged: (key: string) => void
}

type DropdownState = {
  value: string
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target as HTMLSelectElement).value
    this.props.onChanged(value)
    this.setState({ value });
  }

  render() {
    return (
      <select value={ this.state.value } onChange={this.handleChange}>
        <option></option>
        {Object.entries(this.props.items).map(([key, value]) =>
          <option key={key} value={key}>{value}</option>)}
      </select>
    );
  }
}
