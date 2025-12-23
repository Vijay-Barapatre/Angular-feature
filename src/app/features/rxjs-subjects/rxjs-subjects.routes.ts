import { Routes } from '@angular/router';
import { SubjectDemoComponent } from './components/use-case-1/subject-demo.component';
import { BehaviorSubjectDemoComponent } from './components/use-case-2/behavior-subject-demo.component';
import { ReplaySubjectDemoComponent } from './components/use-case-3/replay-subject-demo.component';
import { AsyncSubjectDemoComponent } from './components/use-case-4/async-subject-demo.component';

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
