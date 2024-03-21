import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articolo, ArticoloDb, ImageDb, Paragrafi, ParagrafoDb } from '../models/models';
import { Observable, concatMap, forkJoin, from, map, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticoloService {

  constructor(private http: HttpClient) { }

  serverUrl = '/api'

  getArticle(): Observable<Articolo> {
    return this.http.get<Articolo>(`${this.serverUrl}/articoli`)
  }

  postArticle(articleData: Articolo): Observable<string> {
    const artImage: Observable<string> = this.postImage(articleData.mediaImageFile);
    const paragrafiArray: Observable<ParagrafoDb>[] = articleData.paragrafi.map(p => {
      return this.postImage(p.mediaImageFile).pipe(
        concatMap(pId => this.mapParagrafoToDb(p, pId))
      )
    })

    return forkJoin([artImage, ...paragrafiArray]).pipe(
      concatMap(([artImageid, ...paragrafiDb]) => {
        return this.http.post<ArticoloDb>(`${this.serverUrl}/articoli`, {
          description: articleData.description,
          lingua: articleData.lingua,
          destinationID: articleData.destinationID,
          mediaImageId: artImageid,
          paragrafi: paragrafiDb,
          subtitle: articleData.subtitle,
          title: articleData.title
        } as ArticoloDb).pipe(
          map(x => x.id!)
        )
      })
    )

  }
  postImage(mediaImage: File): Observable<string> {
  
    return this.mapFileToImage(mediaImage).pipe(
      
      concatMap(
        imageDb => {
          
          return this.http.post<ImageDb>(`${this.serverUrl}/mediaImage`, imageDb).pipe(
            map(x => x.id!)
          )
        })
    )

  }
  mapFileToImage(mediaImage: File): Observable<ImageDb> {
    return this.getBase64(mediaImage).pipe(
      map(data => {
        return {
          fileName: mediaImage.name,
          contentType: mediaImage.type,
          data: data
        } as ImageDb
      }),
      take(1)
    )
  }

  getBase64(file: File): Observable<string> {
 
    const read = new Promise<string>(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string)
      };
      reader.onerror = function (error) {
        console.error('Error: ', error);
        reject(error)
      };
    });
    const observable = from(read).pipe(
     )
      return observable
    
  }
  mapParagrafoToDb(paragrafi: Paragrafi, imageId: string): Observable<ParagrafoDb> {

    return of({

      paragraphText: paragrafi.paragraphText,
      destinationID: paragrafi.destinationID,
      mediaImageId: imageId,
      paragraphTitle: paragrafi.paragraphTitle,

    } as ParagrafoDb)
  }

}


