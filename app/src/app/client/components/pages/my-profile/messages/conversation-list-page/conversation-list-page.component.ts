import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserConversationService} from "../../../../../services/user-conversation.service";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ConversationMessageList} from "../../../../../../core/data/models/messages/conversation-message-list.model";

@Component({
  selector: 'app-conversation-list-page',
  templateUrl: './conversation-list-page.component.html',
  styleUrls: ['./conversation-list-page.component.css']
})
export class ConversationListPageComponent implements OnInit, OnDestroy {

  list: ConversationMessageList[] = null;
  latest: ConversationMessageList = null;
  latestUpdatedAt: Date = null;

  isLoading: boolean = false;
  infiniteScrollDisabled: boolean = false;


  constructor(
    private service: UserConversationService,
    private store: Store<State>
  ) { }

  async ngOnInit(): Promise<void> {

    await this.loadList();
  }

  ngOnDestroy(): void {

  }

  async loadList()
  {
    this.infiniteScrollDisabled = true;

    this.isLoading = true;

    const list = await this.service.getList(this.latest, this.latestUpdatedAt).toPromise();
    if (!this.list)
    {
      this.list = [];
    }

    if (list.length > 0)
    {
      this.list = [...this.list, ...list];
      this.latest = list[list.length - 1];
      // @ts-ignore
      this.latestUpdatedAt = this.latest.updateddAt;

      this.infiniteScrollDisabled = false;
    }

    this.isLoading = false;
  }

  async onScroll()
  {
    await this.loadList();
  }

}
