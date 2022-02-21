import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserConversationService} from "../../../../../services/user-conversation.service";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ConversationMessageList} from "../../../../../../core/data/models/messages/conversation-message-list.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conversation-list-page',
  templateUrl: './conversation-list-page.component.html',
  styleUrls: ['./conversation-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConversationListPageComponent implements OnInit, OnDestroy {

  list: ConversationMessageList[] = null;
  latest: ConversationMessageList = null;
  latestUpdatedAt: Date = null;

  isLoading: boolean = false;
  infiniteScrollDisabled: boolean = false;


  constructor(
    private service: UserConversationService,
    private store: Store<State>,
    private router: Router
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

    let list = await this.service.getList(this.latest, this.latestUpdatedAt).toPromise();
    if (!this.list)
    {
      this.list = [];
    }

    list = this.filterReceived(list);
    if (list.length > 0)
    {
      this.list = this.list.concat(list);
      this.latest = list[list.length - 1];
      // @ts-ignore
      this.latestUpdatedAt = this.latest.updateddAt;

      this.infiniteScrollDisabled = false;
    }

    this.isLoading = false;
  }

  filterReceived(lists: ConversationMessageList[])
  {
    const result: ConversationMessageList[] = [];

    for (let list of lists)
    {
      const index = this.list.findIndex(item => item.id === list.id);
      if (index === -1)
      {
        result.push(list);
      }
    }

    return result;
  }

  async onScroll()
  {
    await this.loadList();
  }


  async onConversationClickHandler(conversation: ConversationMessageList)
  {
    await this.router.navigateByUrl('/client/profile/me/messages/conversation/' + conversation.id);
  }

  onRemoveConversationHandler(conversation: ConversationMessageList)
  {
    const index = this.list.findIndex(item => item.id === conversation.id);
    if (index !== -1)
    {
      this.list.splice(index, 1);
    }
  }

}
