import { hello } from '@bhouston/sdk';
import { defineCommand } from 'yargs-file-commands';
import { createClient, createClientWithHost } from '../lib/client.js';

export const command = defineCommand({
  command: 'hello',
  describe: 'Call the hello API endpoint',
  builder: (yargs) =>
    yargs.options({
      name: {
        type: 'string',
        alias: 'n',
        description: 'Name to greet',
      },
      host: {
        type: 'string',
        alias: 'h',
        description: 'API host URL (overrides default)',
      },
    }),
  handler: async (argv) => {
    try {
      const client = argv.host ? createClientWithHost(argv.host) : createClient();
      const result = await hello(client, {
        query: argv.name ? { name: argv.name } : undefined,
      });

      console.log(result.message);
    } catch (error) {
      console.error(`✗ Hello command failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  },
});
