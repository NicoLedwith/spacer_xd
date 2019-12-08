const React = require("react");
const styles = require("./Spacer.css");

class Spacer extends React.Component {
	constructor(props) {
		super(props)

		this.changeVertical = this.changeVertical.bind(this)
		this.changeHorizontal = this.changeHorizontal.bind(this)
		this.toggleVertical = this.toggleVertical.bind(this)
		this.toggleHorizontal = this.toggleHorizontal.bind(this)
	}

	changeVertical(e) {
		this.emitChange("verticalSpacing", e.target.value)
	}

	changeHorizontal(e) {
		this.emitChange("horizontalSpacing", e.target.value)
	}

	toggleVertical() {
		this.changeCheckbox('verticalChecked')
	}

	toggleHorizontal() {
		this.changeCheckbox('horizontalChecked')
	}

	changeCheckbox(checkbox) {
		const { onCheck } = this.props
		if (onCheck) {
			onCheck(checkbox)
		}
	}

	emitChange(component, value) {
		const { onChange } = this.props
		const {verticalSpacing, horizontalSpacing } = this.props
		if (onChange) {
			onChange(
				Object.assign({},{ verticalSpacing, horizontalSpacing }, { [component]: value }),
			)
		}
	}

	render() {
		const { verticalSpacing, horizontalSpacing, verticalChecked, horizontalChecked, onApply } = this.props
		return (
			<div className="spacer">
				<div className="block">
					<label className="h2">Vertical
						<input 
							type="checkbox" 
							checked={verticalChecked} 
							onChange={this.toggleVertical} 
							className="checkbox"/>
					</label>
				</div>
				<input type="number" value={verticalSpacing} onChange={this.changeVertical} />

				<div className="block">
					<label className="h2">Horizontal
						<input 
							type="checkbox" 
							checked={horizontalChecked} 
							onChange={this.toggleHorizontal} 
							className="checkbox"/>
					</label>
				</div>
				<input type="number" value={horizontalSpacing} onChange={this.changeHorizontal} />
				<div className="block">
					<div className="cta" onClick={onApply}>
						APPLY
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Spacer;