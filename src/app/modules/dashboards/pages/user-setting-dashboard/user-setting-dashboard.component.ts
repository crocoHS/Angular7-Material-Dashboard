import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { UserSettingChangeDialogComponent } from './user-setting-change-dialog/user-setting-change-dialog.component';
import { UserSettingAddDialogComponent } from './user-setting-add-dialog/user-setting-add-dialog.component';

export interface IUsers {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: number;
    status: boolean;
    create_at: string;
    update_at: string;
}

export const users: IUsers[] = [
    {
        id: 1,
        name: 'Beltran Bibbie',
        email: 'bbibbie0@google.it',
        phone: '793-745-9935',
        address: '814 Eastlawn Street',
        role: 4,
        status: false,
        create_at: '2019-01-31 09:10:20',
        update_at: '2019-02-01 09:10:20 UTC'
    }, {
        id: 2,
        name: 'Maddie Talby',
        email: 'mtalby1@newsvine.com',
        phone: '111-551-4501',
        address: '6055 Twin Pines Place',
        role: 5,
        status: true,
        create_at: '2019-03-18 22:52:52',
        update_at: '2019-03-30 18:00:51'
    }, {
        id: 3,
        name: 'Garfield Cohn',
        email: 'gcohn2@rakuten.co.jp',
        phone: '473-128-7784',
        address: '6 Jackson Junction',
        role: 5,
        status: false,
        create_at: '2019-01-13 16:06:17',
        update_at: '2019-02-22 04:40:33'
    }, {
        id: 4,
        name: 'Tallou Cattel',
        email: 'tcattel3@tmall.com',
        phone: '568-147-1175',
        address: '10 Del Mar Pass',
        role: 4,
        status: false,
        create_at: '2019-02-26 13:09:55',
        update_at: '2019-03-20 18:32:00'
    }, {
        id: 5,
        name: 'Anya Matfin',
        email: 'amatfin4@mit.edu',
        phone: '506-146-8017',
        address: '26950 Melody Parkway',
        role: 4,
        status: true,
        create_at: '2018-11-08 20:25:55',
        update_at: '2019-01-07 14:08:24'
    }, {
        id: 6,
        name: 'Pepita Gollard',
        email: 'pgollard5@dot.gov',
        phone: '564-380-4412',
        address: '26996 Reinke Avenue',
        role: 5,
        status: false,
        create_at: '2018-11-29 19:35:36',
        update_at: '2018-12-31 20:18:14'
    }, {
        id: 7,
        name: 'Stace Merle',
        email: 'smerle6@ca.gov',
        phone: '999-115-8527',
        address: '2 Westerfield Junction',
        role: 5,
        status: false,
        create_at: '2018-12-14 06:35:35',
        update_at: '2019-01-04 18:36:49'
    }, {
        id: 8,
        name: 'Anne-marie Cranfield',
        email: 'acranfield7@tiny.cc',
        phone: '432-858-0976',
        address: '9 Cody Center',
        role: 4,
        status: true,
        create_at: '2018-11-23 01:10:06',
        update_at: '2019-01-11 23:09:24'
    }, {
        id: 9,
        name: 'Kip Cowing',
        email: 'kcowing8@spotify.com',
        phone: '921-663-4301',
        address: '58408 Pepper Wood Parkway',
        role: 5,
        status: true,
        create_at: '2019-01-17 04:39:05',
        update_at: '2019-01-18 04:39:05 UTC'
    }, {
        id: 10,
        name: 'Port MacGorley',
        email: 'pmacgorley9@time.com',
        phone: '597-580-1067',
        address: '02919 Basil Court',
        role: 5,
        status: false,
        create_at: '2018-12-13 06:10:25',
        update_at: '2019-03-01 13:56:51'
    } ];

@Component( {
    selector: 'app-user-setting-dashboard',
    templateUrl: './user-setting-dashboard.component.html',
    styleUrls: [ './user-setting-dashboard.component.scss' ]
} )
export class UserSettingDashboardComponent implements OnInit {
    // gawe table
    public dataSource = new MatTableDataSource<IUsers>();
    public displayedColumns = [ 'no', 'name', 'email', 'role', 'create_at', 'update_at', 'status', 'action' ];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<IUsers>;
    @ViewChild( MatSort ) sort: MatSort;

    constructor( private dialog: MatDialog ) {
    }

    // Untuk Add User,
    // Subscribe ke post service namun tidak ditambahkan ke table
    addUser() {
        const dialogRef = this.dialog.open( UserSettingAddDialogComponent, {
            maxWidth: '500px',
            width: '90vw'
        } );
        dialogRef.afterClosed().subscribe( ( result ) => {
            if ( result ) {
                // POST SERVICE
                console.log( result );
            }
        } );
    }

    // karena hanya change password saja,
    // maka dari itu langsung post dengan user id dan new password
    editRow( dataFromTable ) {
        const dialogRef = this.dialog.open( UserSettingChangeDialogComponent, {
            maxWidth: '400px',
            width: '90vw',
            data: dataFromTable
        } );
        dialogRef.afterClosed().subscribe( ( result ) => {
            if ( result ) {
                // POST SERVICE
                console.log( result );
            }
        } );
    }

    // filter search
    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    // Subscribe data User yang terkait dengan project ini
    ngOnInit() {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
