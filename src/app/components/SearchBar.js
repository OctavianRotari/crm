// @flow
import * as React from 'react';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import SearchIcon from 'material-ui-icons/Search';
import Button from 'material-ui/Button';

type Props = {
    data: Array<Object>,
    classes: Object,
    fullWidth: boolean,
    onSearch: Function,
    position: string,
    inputPosition: string
}

type State = {
    search: string,
    initialData: Array<Object>,
    visible: boolean
}

const styles = theme => ({
    root: {
        display: 'flex',
        position: 'relative',
        padding: 0,
    },
    buttonRoot: {
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    position_right: {
        marginLeft: 'auto'
    },
    position_left: {
        marginRight: theme.spacing.unit,
    },
    text: {
        height: '1.5rem',
        display: 'flex',
        opacity: 0,
        border: 'none',
        outline: 'none',
        color: '#555',
        padding: '10px',
        width: '0px',
        position: 'absolute',
        top: 0,
        background: 'none',
        zIndex: 3,
        transition: 'width .4s cubic-bezier(0.000, 0.795, 0.000, 1.000), opacity .4s ease',
        cursor: 'pointer',
        marginTop: 10
    },
    visible: {
        paddingLeft: 0,
        opacity: 1,
        width: 100,
        zIndex: 1,
        borderBottom: '1px solid #BBB',
        cursor: 'text',
        backgroundColor: '#f1f1f1',
    },
    text_right: {
        left: theme.spacing.unit * 2,
    },
    text_left: {
        right: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: '1rem',
        fill: 'black',
        display: 'inline-block',
        textIndent: '-10000px',
        border: 'none',
        zIndex: 2,
        cursor: 'pointer',
        opacity: 0.4,
        transition: 'opacity .4s ease',
        '&:hover': {
            opacity: 0.8
        },
    },
});

class SearchBar extends React.Component<Props, State> {
    static defaultProps = {
        fullWidth: false
    }

    state = {
        search: '',
        initialData: [],
        visible: false
    }

    componentWillMount() {
        this.setState({initialData: this.props.data});
    }

    onFocusOutInputField = () => {
        this.setState({search: ''}, () => {
            const { onSearch } = this.props;
            onSearch(this.filterData());
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event: Object) => {
        this.setState({search: event.target.value}, () => {
            const { onSearch } = this.props;
            onSearch(this.filterData());
        });
    }

    filterData = () => {
        const { search, initialData } = this.state;
        if(search === '') {
            return initialData;
        }
        let filteredData = initialData.map(record => {
            let matches = false;
            for(let key in record) {
                let value = record[key];
                if(typeof(value) !== 'string') {
                    value = value.toString();
                }
                matches = value.match(new RegExp(search, 'i')) ? true : false;
                if(matches){break;}
            }
            if(matches) {
                return record;
            }
        });
        return _.compact(filteredData);
    }

    inputField = null;

    render() {
        const { classes, position, inputPosition } = this.props;
        const { visible } = this.state;
        const classNameRoot = classNames(
            classes.root,
            {
                [classes[`position_${position}`]]: position
            }
        );
        const classNameInput = classNames(
            classes.text,
            {
                [classes[`text_${inputPosition}`]]: inputPosition,
                [classes.visible]: visible
            }
        );
        return (
            <form  className={classNameRoot} onSubmit={this.handleSubmit}>
                <Button
                    dense
                    classes={{root: classes.buttonRoot}}
                    color='contrast'
                    onClick={() => this.setState({visible: !visible})}
                    disableFocusRipple
                >
                    <SearchIcon
                        className={classes.icon}
                    />
                </Button>
                <input
                    ref={node => this.inputField = node}
                    type="text"
                    value={this.state.search}
                    onChange={this.handleChange}
                    className={classNameInput}
                />
            </form>
        );
    }
}

export default withStyles(styles)(SearchBar);
