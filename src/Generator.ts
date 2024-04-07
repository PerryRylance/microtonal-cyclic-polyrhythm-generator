import { File, Track, ProgramChangeEvent, ProgramType, EndOfTrackEvent, NoteOffEvent } from "@perry-rylance/midi"
import MicrotonalNoteOnEvents from "./events/MicrotonalNoteOnEvents";

export default class Generator
{
	generate(): File
	{
		const file				= new File();
		const instrument		= ProgramType.TUBULAR_BELLS;

		const maximumTicks		= 480 * 60 * 60;
		const initialDelta		= 480 * 30;
		const deltaScale		= 1 + (Math.SQRT2 / 36);

		const pitchesPerOctave	= 10;
		const octaves			= 1.5;
		const numPitches		= Math.max(15, Math.floor(pitchesPerOctave * octaves));

		const scalePitches: number[] = [];

		for(let i = 0; i < numPitches; i++)
			scalePitches.push(60 + ((i / pitchesPerOctave) * (12 * octaves)));

		for(let i = 0; i < scalePitches.length; i++)
		{
			const channel	= i + (i >= 9 ? 1 : 0);
			const advance	= initialDelta * Math.pow(deltaScale, i);

			const track		= new Track();
			const program	= new ProgramChangeEvent();

			program.channel = channel;
			program.program	= instrument;

			track.events.push(program);

			for(let absolute = 0; absolute < maximumTicks; absolute += advance)
			{
				const nextAbsolute	= (absolute + advance);
				const roundedDelta	= Math.round(nextAbsolute - absolute);

				const on			= new MicrotonalNoteOnEvents();
				const off			= new NoteOffEvent();

				on.channel = off.channel = channel;

				on.key				= scalePitches[i];
				off.key				= Math.floor(scalePitches[i]);

				off.delta			= roundedDelta;

				track.events.push(...on, off);
			}
			
			track.events.push(new EndOfTrackEvent());

			file.tracks.push(track);
		}

		return file;
	}
}