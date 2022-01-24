import React from 'react';
import classNames from 'classnames'

import './fadebox.css'

var id: ReturnType<typeof setInterval>

export class FadeBox extends React.Component {
  constructor(props: {}){
    super(props)
    this.state = {
      fadeOut: true
    }
  }

  componentDidMount(){
    id = setInterval(() => {
      (this as any).setState(({ fadeOut }: any) => ({ fadeOut: ! fadeOut }))
    }, 3000)
  }

  componentWillUnmount(){
    clearInterval(id)
  }

  render(){
    var boxClass = classNames({
      'fade-box': true,
      'fade-in': true,
      'fade-out': (this.state as any).fadeOut,
    });
    console.log(boxClass)

    return <div className={boxClass}>
      {this.props.children}
    </div>
  }
}
