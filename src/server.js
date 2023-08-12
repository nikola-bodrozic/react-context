import { createServer, Model } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      notes: Model,
    },
    seeds(server) {
      server.create('note', {
        title: 'Nulla sit amet',
        body:
          'Praesent congue erat at massa. Pellentesque habitant ',
      });
      server.create('note', {
        title: 'Curabitur suscipit suscipit',
        body:
          'Fusce risus nisl, viverra et, tempor et, pretium in, sapien. ',
      });
      server.create('note', {
        title: 'Donec id justo',
        body:
          'Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. ',
      });
    },
    routes() {
      this.namespace = 'api/notes';
      this.get('/', (schema, request) => {
        return schema.notes.all();
      });
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id);
      });
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.notes.create(attrs);
      });
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.notes.find(id);
        return note.update(newAttrs);
      });
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id).destroy();
      });
    },
  });
  return server;
}