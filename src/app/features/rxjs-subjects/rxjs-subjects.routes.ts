import { Routes } from '@angular/router';
import { SubjectDemoComponent } from './components/subject-demo/subject-demo.component';
import { BehaviorSubjectDemoComponent } from './components/behavior-subject-demo/behavior-subject-demo.component';
import { ReplaySubjectDemoComponent } from './components/replay-subject-demo/replay-subject-demo.component';
import { AsyncSubjectDemoComponent } from './components/async-subject-demo/async-subject-demo.component';

export const RXJS_SUBJECTS_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'subject', component: SubjectDemoComponent },
            { path: 'behavior-subject', component: BehaviorSubjectDemoComponent },
            { path: 'replay-subject', component: ReplaySubjectDemoComponent },
            { path: 'async-subject', component: AsyncSubjectDemoComponent },
            { path: '', redirectTo: 'subject', pathMatch: 'full' }
        ]
    }
];
