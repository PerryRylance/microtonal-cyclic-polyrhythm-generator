import { Event, NoteOnEvent, PitchWheelEvent } from "@perry-rylance/midi";

export default class MicrotonalNoteOnEvents extends Array<Event>
{
	private _channel: number = 0;
	private _microtonalKey: number = 60;

	private _pitchBendEvent: PitchWheelEvent;
	private _noteOnEvent: NoteOnEvent;

	constructor(delta: number = 0)
	{
		super();

		this._pitchBendEvent = new PitchWheelEvent();
		this._noteOnEvent = new NoteOnEvent(delta);

		this.key = 60;

		this.push(this._pitchBendEvent, this._noteOnEvent);
	}

	get delta(): number
	{
		return this._noteOnEvent.delta;
	}

	set delta(value: number)
	{
		this._noteOnEvent.delta = value;
	}

	get key(): number
	{
		return this._microtonalKey;
	}

	set key(value: number)
	{
		if(value < 0 || value >= 128)
			throw new RangeError("Key out of range");

		const fract	= this._microtonalKey - Math.floor(this._microtonalKey);

		this._noteOnEvent.key = Math.floor(value);
		this._pitchBendEvent.amount = fract / 2; // NB: Assume GM pitch wheel range of -2 / +2

		this._microtonalKey = value;
	}

	get channel(): number
	{
		return this._channel;
	}

	set channel(value: number)
	{
		if(!Number.isInteger(value))
			throw new TypeError("Value must be an integer");

		if(value < 0 || value > 15)
			throw new RangeError("Channel out of range");

		this._channel =
			this._noteOnEvent.channel = 
			this._pitchBendEvent.channel = value;
	}

	get velocity(): number
	{
		return this._noteOnEvent.velocity;
	}

	set velocity(value: number)
	{
		if(!Number.isInteger(value))
			throw new TypeError("Value must be an integer");

		if(value < 0 || value > 127)
			throw new RangeError("Channel out of range");

		this._noteOnEvent.velocity = value;
	}
}