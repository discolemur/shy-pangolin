"use strict";

const _DEFAULT_ALL_LEVELS = true;

class Body extends Component {
  constructor(props) {
    super(props);
    this.closeMenus = this.closeMenus.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.onNewQuestion = this.onNewQuestion.bind(this);
    this.setState({
      top: 0,
      height: 0,
      casual: true,
      unique: true,
      higher: true,
      casual: true,
      deeper: _DEFAULT_ALL_LEVELS,
      dating: _DEFAULT_ALL_LEVELS,
      serious: _DEFAULT_ALL_LEVELS,
      engaged: _DEFAULT_ALL_LEVELS,
      married: _DEFAULT_ALL_LEVELS
    });
    this.inquisitor = new Inquisitor();
    this.menuClosers = [];
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
    if (name == 'unique') {
      this.inquisitor.setUnique(value);
    }
    if (name == 'higher') {
      this.inquisitor.setPreferHigher(value);
    }
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
    const qProps = new RandomQuestionProps(
      this.state.casual,
      this.state.deeper,
      this.state.dating,
      this.state.serious,
      this.state.engaged,
      this.state.married);
    this.closeMenus();
    this.setState({ question: this.inquisitor.randomQuestion(qProps) })
  };
  closeMenus(event) {
    for (let l of this.menuClosers) {
      l();
    }
  };
  render(props, state) {
    return (
      h('div', { id: 'Wrapper' },
        h('div', {
          id: 'BACKGROUND',
          style: `background: ${resources.background.color};`// background-image: url(${resources.background.img});`
        }),
        h('div', { id: 'Menus' },
          h(Levels, { setCloseListener: (l) => this.menuClosers.push(l), casual: state.casual, deeper: state.deeper, dating: state.dating, serious: state.serious, engaged: state.engaged, married: state.married, handleCheckChange: this.handleCheckChange }),
          h('div', { id: 'BUFFER', style: "width: 100%;" }),
          h(Settings, { setCloseListener: (l) => this.menuClosers.push(l), unique: state.unique, higher: state.higher, handleCheckChange: this.handleCheckChange }),
        ),
        h('div', { id: 'Content' },
          h('div', { className: 'ContentCell', style: 'height: 100%;' },
            state.question ? h('span', { id: 'Question' }, state.question) : null
          ),
          h('div', { className: 'ContentCell', style: 'height: 0%;' },
            h('button', { type: 'button', onclick: this.onNewQuestion, id: 'QBtn' }, 'New Question'),
          )
        )
      )
    )
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.close();
    props.setCloseListener(this.close);
  };
  close(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.setState({ open: false });
  };
  render(props, state) {
    let _height = state.open ? 4 : props.height;
    return (
      h('div', { className: 'menu' },
        h('div', { className: 'menuTop', style: `background: ${resources.background.color};` },
          h('span', { className: 'label' }, props.label),
          h('div', { className: state.open ? 'icon open' : 'icon closed', onclick: () => this.setState({ open: !state.open }) },
            h('img', { className: 'clickable', src: props.icon })
          )
        ),
        h('div', { className: state.open ? 'shrinkable open' : 'shrinkable closed', style: `top: ${_height}rem; background: ${resources.background.color}` },
          h('div', { className: 'items', style: `width: ${props.width}rem;` }, props.items)
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
  return h(Menu, { setCloseListener: props.setCloseListener, height: -13.2, width: 8, items: items, icon: resources.icon.levels, label: 'Relationship Level' });
}

function Settings(props) {
  const items = [
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'No repeats'),
      h('input', { type: 'checkbox', name: 'unique', checked: props.unique, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'checkboxTxt' }, 'Prefer higher level'),
      h('input', { type: 'checkbox', name: 'higher', checked: props.higher, onChange: props.handleCheckChange })
    ),
    h('div', { className: "item" },
      h('span', { className: 'menuTxt' }, '© 2018 Nick Jensen')
    )
  ]
  return h(Menu, { setCloseListener: props.setCloseListener, height: -3, width: 11, items: items, icon: resources.icon.settings, label: 'Settings' });
}


render(h(Body), document.getElementById('Main'));
