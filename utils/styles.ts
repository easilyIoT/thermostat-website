import { RGB } from '../interfaces/colors';

export const hexToRgb = (hex: string): RGB => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};
}

export const fullViewPort: string = "calc(var(--vh, 1vh) * 100)";