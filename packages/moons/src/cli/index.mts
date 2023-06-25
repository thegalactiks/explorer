import { Command } from 'commander';
import { action as buildAction, type Options } from './actions/build.mjs';

const program = new Command();

program
  .name('Moons')
  .description('Generate Website with moons and deploy your own galaxy.');

program.option('-c, --config <path>');

program.command('build [path]')
  .argument('[templatePath]', 'Template path')
  .argument('[path]', 'Project root path', '.')
  .option('-m, --manifest <path>')
  .action(async (templatePath: string, path = '.', options: Options) => {
    try {
      await buildAction(templatePath, path, options);
    } catch (err) {
      program.error((err as Error).toString());
    }
  })

program.parse();
