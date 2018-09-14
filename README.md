### Angular-RU community extension for Angular

- [ngx-component-outlet](https://github.com/IndigoSoft/ngxd)
  Best way to quickly use Dynamic Components with Angular
  
```html
<app-dynamic [ngxComponentOutlet]="component" [entity]="entity" (action)="onAction($event)">
  <!-- Use like NgComponentOutlet but with @Input/@Output auto bindings -->
</app-dynamic>
```

- https://github.com/rucken/
  Core with Admin UI for web application maked on Angular 6+
  
```bash
git clone https://github.com/rucken/core.git my-app
cd my-app
npm install
npm run start:prod

# or you can usage CLI
npm install -g @rucken/cli
rucken new:angular my-app
cd my-app
npm install
npm run start:prod
```
