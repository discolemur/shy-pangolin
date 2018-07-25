"use strict";

class Body extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.onNewQuestion = this.onNewQuestion.bind(this);
    this.setState({ top: 0, height: 0 });
    this.inquisitor = new Inquisitor();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  };
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  };
  handleCheckChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  handleScroll(event) {
    const currentTop = event.target.scrollTop;
    const height = event.target.clientHeight;
    this.setState({ height: height, top: currentTop });
  };
  onNewQuestion() {
    this.setState({ question: this.inquisitor.randomQuestion({ casual: this.state.casual, deeper: this.state.deeper, dating: this.state.dating, serious: this.state.serious, engaged: this.state.engaged, married: this.state.married }) })
  };
  render(props, state) {
    return (
      h('div', { id: 'Wrapper' },
        h('div', { id: 'Menus' },
          h(Levels, { casual: state.casual, deeper: state.deeper, dating: state.dating, serious: state.serious, engaged: state.engaged, married: state.married, handleCheckChange: this.handleCheckChange }),
          h('div', { id: 'BUFFER', style: "width: 100%;" }),
          h(Settings, { unique: state.unique, higher: state.higher, handleCheckChange: this.handleCheckChange }),
        ),
        h('div', { id: 'Content' },
          h('div', { className: 'ContentCell', style: 'height: 100%;' },
            h('span', { id: 'Question' }, state.question)
          ),
          h('div', { className: 'ContentCell', style: 'height: 0%;' },
            h('button', { type: 'button', onclick: this.onNewQuestion, id: 'QBtn' }, 'New Question'),
          )
        ),
        h(Footer, null)
      )
    )
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.setState({ open: false });
  }
  render(props, state) {
    return (
      h('div', { className: 'menu' },
        h('span', { className: 'label' }, props.label),
        h('div', { className: state.open ? 'icon open' : 'icon closed', onclick: () => this.setState({ open: !state.open }) },
          h('img', { className: 'clickable', src: props.icon })
        ),
        h('div', { className: state.open ? 'shrinkable open' : 'shrinkable closed' },
          h('div', { className: 'items' }, props.items)
        )
      )
    )
  }
}

function Levels(props) {
  const items = [
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'casual'),
      h('input', { type: 'checkbox', name: 'casual', checked: props.casual, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'deeper'),
      h('input', { type: 'checkbox', name: 'deeper', checked: props.deeper, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'dating'),
      h('input', { type: 'checkbox', name: 'dating', checked: props.dating, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'serious'),
      h('input', { type: 'checkbox', name: 'serious', checked: props.serious, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'engaged'),
      h('input', { type: 'checkbox', name: 'engaged', checked: props.engaged, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'married'),
      h('input', { type: 'checkbox', name: 'married', checked: props.married, onChange: props.handleCheckChange })
    )
  ]
  return h(Menu, { items: items, icon: resources.icon.levels, label: 'Relationship Level' });
}

// TODO: actually make the settings do stuff.
function Settings(props) {
  const items = [
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'With replacement'),
      h('input', { type: 'checkbox', name: 'unique', checked: props.unique, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'Prefer higher level'),
      h('input', { type: 'checkbox', name: 'higher', checked: props.higher, onChange: props.handleCheckChange })
    )
  ]
  return h(Menu, { items: items, icon: resources.icon.settings, label: 'Settings' });
}

function Footer(props) {
  const footnotes = [];
  return (
    h('div', { id: 'Footer' },
      h('p', null, '© 2018 Nick Jensen')
    )
  )
}

render(h(Body), document.getElementById('Main'));
