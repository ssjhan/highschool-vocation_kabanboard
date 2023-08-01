/**
 * 칸반보드 생성 DTO
 */
export class CreateKanbanBoardDto {
  /**
   * 제목
   */
  title: string;

  /**
   * 내용
   */
  content: string;

  /**
   * 상태
   */
  status: string;
}
