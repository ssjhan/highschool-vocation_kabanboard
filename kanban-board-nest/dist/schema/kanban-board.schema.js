"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanBoardSchema = exports.KanbanBoard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let KanbanBoard = class KanbanBoard {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], KanbanBoard.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], KanbanBoard.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        required: true,
        default: 'TODO',
    }),
    __metadata("design:type", String)
], KanbanBoard.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        required: true,
        default: true,
    }),
    __metadata("design:type", Boolean)
], KanbanBoard.prototype, "isActivate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], KanbanBoard.prototype, "createBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
        default: new Date(),
    }),
    __metadata("design:type", Date)
], KanbanBoard.prototype, "createAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], KanbanBoard.prototype, "updateBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
        default: new Date(),
    }),
    __metadata("design:type", Date)
], KanbanBoard.prototype, "updateAt", void 0);
KanbanBoard = __decorate([
    (0, mongoose_1.Schema)()
], KanbanBoard);
exports.KanbanBoard = KanbanBoard;
exports.KanbanBoardSchema = mongoose_1.SchemaFactory.createForClass(KanbanBoard);
//# sourceMappingURL=kanban-board.schema.js.map