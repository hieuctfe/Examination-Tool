import { Component, OnInit, ViewChild } from '@angular/core';
import { LoService } from '../../../../services/lo.service';
import { LearningOutcome } from '../../../../model/LO.model';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../services/message.service';
import { LoModalComponent } from '../lo-modal/lo-modal.component';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { ParserService } from '../../../../services/parser.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild(TreeComponent) private treeView: TreeComponent;
  code: any;
  rootData: any;
  tree: any;
  deleted = [];
  isChange = false;
  options: ITreeOptions = {
    allowDrag: (node) => {
      if (!node.data.data || node.data.data.name.toLowerCase().trim() == 'others') {
        return false;
      }
      if (node.data.isParent) {
        return false;
      }
      return true;
    },
    allowDrop: (node, { parent }, event) => {
      if (!parent.data.data || parent.data.data.name.toLowerCase().trim() == 'others') {
        return false;
      }
      if (parent.data.isParent) {
        node.data.data.state = 2;
        this.isChange = true;
        node.parent.data.children.forEach(el => {
          if (el.data.state !== 1) {
            el.data.state = 2;
          }
        });
        parent.data.children.forEach(el => {
          if (el.data.state !== 1) {
            el.data.state = 2;
          }
        });
        return true;
      }
      return false;
    }
  };

  constructor(private loSV: LoService, private route: ActivatedRoute, private messageSV: MessageService,
    private parserSV: ParserService) {
  }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.code = params['course'];
      if (this.code) {
        this.loadMO(this.code);
      }
    }, er => {
      swal('Error', 'Cannot load Learning outcomes', 'error');
    });
  }

  loadMO(code) {
    this.loSV.getLoBaseOnCourse(this.code).subscribe((el: any) => {
      this.rootData = JSON.stringify(el);
      this.tree = el.children;
    }, er => console.log(er));
  }

  showModal(data, isEdit, isMO) {
    const config = {
      initialState: {
        data: isEdit ? data.data.data : null,
        type: 'create',
        returnDt: new LearningOutcome()
      }
    };
    this.messageSV.createModal(data, LoModalComponent, config).subscribe(async (value: any) => {
      if (value.success === true) {
        if (!isEdit) {
          if (isMO) {
            this.tree.push({
              data: value.data,
              children: [],
              isParent: true,
              haveChildren: true,
              id: this.parserSV.guidGenerator()
            });
            this.isChange = true;
          } else {
            data.data.children.push({
              data: value.data,
              children: [],
              isParent: false,
              haveChildren: false,
              id: this.parserSV.guidGenerator()
            });
            this.isChange = true;
          }
        } else {
          let index = -1;
          if (isMO) {
            index = this.findIndex(this.tree, value.data);
            if (index !== -1) {
              this.tree[index].data.name = value.data.name;
              if (this.tree[index].data.state !== 1) {
                this.tree[index].data.state = 2;
              }
              this.isChange = true;
            }
          } else {
            index = this.findIndex(data.parent.data.children, value.data);
            if (index !== -1) {
              data.parent.data.children[index].data.name = value.data.name;
              if (data.parent.data.children[index].data.state !== 1) {
                data.parent.data.children[index].data.state = 2;
              }
              this.isChange = true;
            }
          }
        }
        this.treeView.treeModel.update();
      }
    });
  }

  remove(data, isMO) {
    let index = -1;
    if (isMO) {
      index = this.findIndex(this.tree, data.data.data);
      if (index !== -1) {
        if (this.tree[index].data.state !== 1) {
          this.deleted.push(this.tree[index]);
        }
        this.tree.splice(index, 1);
        this.isChange = true;
      }
    } else {
      index = this.findIndex(data.parent.data.children, data.data.data);
      if (index !== -1) {
        if (data.parent.data.children[index].data.state !== 1) {
          this.deleted.push(data.parent.data.children[index]);
        }
        data.parent.data.children.splice(index, 1);
        this.isChange = true;
      }
    }
    this.treeView.treeModel.update();
  }

  findIndex(array, data) {
    return array.map(el => el.data.id).indexOf(data.id);
  }

  reset() {
    this.deleted = [];
    this.tree = JSON.parse(this.rootData).children;
    this.isChange = false;
    this.treeView.treeModel.update();
  }

  save() {
    const root = JSON.parse(this.rootData);
    root.children = this.deleted;
    const deleteRoot = JSON.stringify(root);
    root.children = this.tree
    const treeRoot = JSON.stringify(root);
    const data = {
      courseCode: this.code,
      deletes: JSON.parse(deleteRoot),
      createUpdate: JSON.parse(treeRoot),
    }
    this.loSV.saveLO(data).subscribe(el => {
      swal('Success', 'Save Successful', 'success');
      this.isChange = false;
      this.deleted = [];
      this.loadMO(null);
    }, er => {
      swal('Error', 'An error has occurred', 'error');
    })
  }

}
