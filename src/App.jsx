const React = require('react');
const styles = require('./App.css');
const Spacer = require('./components/Spacer')

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            verticalSpacing: 0,
            horizontalSpacing: 0,
            verticalChecked: false,
            horizontalChecked: false,
        }

        this.panel = React.createRef();
        this.documentStateChanged = this.documentStateChanged.bind(this)
        this.spacingChanged = this.spacingChanged.bind(this)
        this.checked = this.checked.bind(this)
        this.apply = this.apply.bind(this)
    }

    documentStateChanged(selection) {
        if (selection.items.length > 1) {
            // Needs more work
            // this.guessOrientation(selection.items)
        }
    }

    guessOrientation(items) {
        let diffX, diffY = 0
        const diffsX = items.slice(1).map((item, i) => item.globalBounds.x - items[i].globalBounds.x)
        const diffsY = items.slice(1).map((item, i) => item.globalBounds.y - items[i].globalBounds.y)
        const avgDiffX = diffsX.reduce((sum, i) => sum + i, 0) / diffsX.length
        const avgDiffY = diffsY.reduce((sum, i) => sum + i, 0) / diffsY.length
        
        if (avgDiffY < avgDiffX) {
            this.setState({ horizontalChecked: true})
        } else {
            this.setState({ verticalChecked: true })
        }
    }

    checked(option) {
        const toggle = !this.state[option]
        this.setState({ [option]: toggle })
    }

    spacingChanged(spacing) {
        this.setState({
            verticalSpacing: spacing.verticalSpacing,
            horizontalSpacing: spacing.horizontalSpacing
        }, () => {
            // Update Items
            const { verticalSpacing, horizontalSpacing, verticalChecked, horizontalChecked } = this.state
            const { editDocument } = require("application");
            const { selection } = require("scenegraph");

            editDocument({
                'editLabel': "Move Items"
            }, () => {
                if (verticalChecked) {
                    this.moveVertically(verticalSpacing, selection)
                }
                if (horizontalChecked) {
                    this.moveHorizontally(horizontalSpacing, selection)
                }
            })

        })
    }
    
    moveVertically(verticalSpacing, selection) {
        const items = selection.items.sort((a, b) => {
            return a.globalBounds.y - b.globalBounds.y
        })
        let i = 1

        for (; i < items.length; i++) {
            const item = items[i]
            const previousItem = items[i-1]
            const {y, height} = item.globalBounds
            const {y: previousY, height: previousHeight} = previousItem.globalBounds
            const deltaY = previousY + previousHeight + parseFloat(verticalSpacing) - y
            item.moveInParentCoordinates(0, deltaY)
        }
    }

    moveHorizontally(horizontalSpacing, selection) {
        const items = selection.items.sort((a, b) => {
            return a.globalBounds.x - b.globalBounds.x
        })
        let i = 1

        for (; i < items.length; i++) {
            const item = items[i]
            const previousItem = items[i-1]
            const {x, width} = item.globalBounds
            const {x: previousX, width: previousWidth} = previousItem.globalBounds
            const deltaX = previousX + previousWidth + parseFloat(horizontalSpacing) - x
            item.moveInParentCoordinates(deltaX, 0)
        }
    }

    apply() {
        this.spacingChanged(this.state)
    }

    render() {
        const { selection } = this.props;
        const { verticalSpacing, horizontalSpacing, verticalChecked, horizontalChecked } = this.state

        return (
            <panel className={styles.panel}>
                <Spacer 
                    verticalSpacing={verticalSpacing}
                    horizontalSpacing={horizontalSpacing}
                    verticalChecked={verticalChecked}
                    horizontalChecked={this.state.horizontalChecked}
                    onCheck={this.checked}
                    onChange={this.spacingChanged}
                    onApply={this.apply}
                />
            </panel>
        );
    }
}

module.exports = App;
