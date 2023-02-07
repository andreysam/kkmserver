import sendCommand, { Options } from '../sendCommand';

/** Закрыть смену по картам */
async function settlement(options: Options = {}): Promise<void> {
  // Вызов команды
  const data = await sendCommand('Settlement', {}, options);

  return data;
}

export default settlement;
