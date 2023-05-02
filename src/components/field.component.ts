import { FIELD_TEMPLATE } from '../templates/field.template'
import { Echoable } from '../interfaces/echoable'
import { BaseComponent } from './base.component'

export class FieldComponent extends BaseComponent implements Echoable {
	name: string
	nonNullableAssertion: boolean
	nullable: boolean
	useUndefinedDefault: boolean
	default?: string
	type?: string

	echo = () => {
		let name = this.name
		let type = this.type

		if (
			this.nullable !== true &&
			this.nonNullableAssertion === true &&
			!this.default
		) {
			name += '!'
		}

		let defaultValue = ''
		if (this.default) {
			defaultValue = `= ${this.default}`
			type = ''
		} else {
			name += ':'
		}

		if (this.nullable === true && type) {
			type += ` | null`
			if (!this.default) {
				defaultValue = `= null`
			}
		}

		return FIELD_TEMPLATE.replace('#!{NAME}', name)
			.replace('#!{NAME}', name)
			.replace('#!{TYPE}', type)
			.replace('#!{DECORATORS}', this.echoDecorators())
			.replace('#!{DEFAULT}', defaultValue)
	}

	constructor(obj: { name: string; useUndefinedDefault: boolean }) {
		super(obj)
	}
}
