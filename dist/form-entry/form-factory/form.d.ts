import { FormFactory } from './form.factory';
import { QuestionFactory } from './question.factory';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode } from './form-node';
export declare class Form {
    schema: any;
    FormFactory: FormFactory;
    questionFactory: QuestionFactory;
    rootNode: GroupNode;
    valueProcessingInfo: any;
    existingOrders: any;
    private _dataSourcesContainer;
    private _showErrors;
    constructor(schema: any, FormFactory: FormFactory, questionFactory: QuestionFactory);
    readonly dataSourcesContainer: DataSources;
    searchNodeByPath(node: GroupNode, path: any, found: Array<NodeBase>): NodeBase[];
    searchNodeByQuestionId(questionId: string, questionType?: string): Array<NodeBase>;
    searchNodeByQuestionType(rootNode: any, questionType: string, found: Array<NodeBase>): void;
    private findNodesByQuestionId(rootNode, questionId, results);
    readonly valid: boolean;
    showErrors: boolean;
    markInvalidControls(node: GroupNode, invalidControlNodes?: any): any;
    updateHiddenDisabledStateForAllControls(): void;
    private _updateHiddenDisabledStateForAllControls(rootNode);
}
