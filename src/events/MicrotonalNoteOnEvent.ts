import { NoteOnEvent, PitchWheelEvent, WriteStream } from "@perry-rylance/midi";
import { StatusBytes } from "@perry-rylance/midi/dist/streams/StatusBytes.js";

export default class MicrotonalNoteOnEvent extends NoteOnEvent
{
	private _microtonalKey: number = 60;

	get key(): number
	{
		return this._microtonalKey;
	}

	set key(value: number)
	{
		if(value < 0 || value >= 128)
			throw new RangeError("Key out of range");

		this._microtonalKey = value;
	}

	writeBytes(stream: WriteStream, status?: StatusBytes): void 
	{
		const shim	= new PitchWheelEvent(0, this.channel);
		const fract	= this._microtonalKey - Math.floor(this._microtonalKey);

		shim.amount = fract / 2; // NB: Assume GM pitch wheel range of -2 / +2

		shim.writeBytes(stream, status);

		super.writeBytes(stream, status);
	}
}