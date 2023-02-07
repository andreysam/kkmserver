import sendCommand, { Options } from '../sendCommand';

/** Получить итоги дня по картам */
async function terminalReport(
  detailed = false,
  options: Options = {}
): Promise<void> {
  // Вызов команды
  const data = await sendCommand(
    'TerminalReport',
    { Detailed: detailed },
    options
  );

  return data;
}

export default terminalReport;
